import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    message: '',
    error: null,
    loading: false
}

const buildNewCategories = function(parentId, categories, category) {
    let categoryArr = [];

    if(parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }

    for(let cat of categories) {
        if(cat._id === parentId){
            categoryArr.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, [
                    ...cat.children,
                    {_id: category._id, name: category.name, slug: category.slug, parentId: category.parentId, children: category.children }
                ], category) : []
            });
        }else {
            categoryArr.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
        
    }

    return categoryArr;
}

export default function(state = initState,action) {
    // console.log(action);
    switch(action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categoryList,
                error: null,
                loading: false
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case categoryConstants.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId,state.categories,category);
            console.log(updatedCategories);
            state = {
                ...state,
                categories: updatedCategories,
                error: null,
                loading: false
            }
            break;
        case categoryConstants.ADD_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }

   return state;
}