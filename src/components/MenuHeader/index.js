import React, { useEffect } from 'react';
import { getAllCategory } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';


export default function MenuHeader() {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    const renderCategories = function(categories) {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.parentId ? 
                    <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a>
                    : <span>{category.name}</span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    return (
        <div className="menuHeader">
            {/* <h1>Menu Header</h1> */}
            {/* <div>{JSON.stringify(category.categories)}</div> */}
            <ul>
                { 
                    category.categories.length > 0 ? 
                    renderCategories(category.categories) : 
                    null 
                }
            </ul>
        </div>
    )
}
