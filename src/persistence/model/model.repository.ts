import { Model } from "sequelize-typescript";
import {FindOptions,FindAttributeOptions} from 'sequelize'
import { Term } from "../term/term.entity";
import { Course } from "../course/course.entity";
import { PaginationDto } from "src/domain/user/pagination.dto";

class FindOption implements FindOptions{
    limit:number;
    skip:number;
    
    paginate(paginationData:PaginationDto){
        const skippedItems=(paginationData.page-1)*paginationData.limit;
        this.limit=paginationData.limit;
        this.skip=skippedItems;
        return this; 
    }

    filter(filterData){
        return this;
    }

    sort(sortData){
        return this;
    }
}

class BuffedModel extends Model{
    static INCLUDES={}
    static DEFAULT_EXCLUDES = [];
    static DEFAULT_INCLUDES = null;
    static getAttributes():FindAttributeOptions{
        const attributes:FindAttributeOptions={
            exclude:this.DEFAULT_EXCLUDES
        };
        if(this.DEFAULT_INCLUDES && this.DEFAULT_INCLUDES.length){
            attributes.include=this.DEFAULT_INCLUDES
        }
        return attributes;
    }
}



export class ModelRepository<T extends typeof Model & { new (): void}>{
    model:T;
    constructor(model:T){
        this.model=model;
    }

    //get method
    public async get(paginateOptions?,filterOptions?,sortOptions?,relationOptions?){
        console.log(123456);
        console.log(paginateOptions,sortOptions,filterOptions,relationOptions);
        //const query=new FindOption();
        const query={};
        if(paginateOptions!==undefined){
            this.paginateQuery(query,paginateOptions);
        }

        if(filterOptions!==undefined){
            this.filterQuery(query,filterOptions);
        }

        if(sortOptions!==undefined){
            this.sortQuery(query,sortOptions);
        }

        if(relationOptions!==undefined){
            this.relationsQuery(query,relationOptions);
        }


        return this.model.findAndCountAll(query);
    }

    //get one method
    public async getOne(filterOptions){
        const query={};
        this.filterQuery(query,filterOptions);
        console.log(query);
        return this.model.findOne(query)
    }

    //post method
    public async create(model){
        console.log('to je tooo');
        //mogu se proslediti i dodati nove opcije
        return this.model.create(model);
    }

    //put method
    public async update(model,filterOptions){
        const query:any={};
        this.filterQuery(query,filterOptions);
        this.model.update(model,query);
    }

    //delete method
    public async delete(filterOptions){
        const query={};
        this.filterQuery(query,filterOptions);
        this.model.destroy(query);
    }

    paginateQuery(query,paginationDto){
        const skippedItems=(paginationDto.page-1)*paginationDto.limit;
        query.limit=paginationDto.limit;
        query.offset=skippedItems;
    }

    filterQuery(query,filterOptions){
        query.where=filterOptions;
        return;
    }

    sortQuery(query,sortOptions){
        return;
    }

    relationsQuery(query,relationOptions){
        const {relationPaths=[]} =relationOptions
        console.log(relationOptions);
        console.log(relationPaths);
        const relations=[];
        relationOptions.forEach(modelName=>{
            relations.push({
                model:modelName,
                attributes:modelName.getAttributes()
            })
        });
        console.log(relations);
        query.include=relations;
        console.log(query);
    }

}