import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateCategory } from "../managers/categoryManager"


export const NewCategoryForm = () => {

    const [category, setAllCategories] = useState({ name: "" })

    const navigate = useNavigate()

    const handleSave = (evt) => {
        evt.preventDefault()
         const newCategory = {
            name: category.name
        }
        CreateCategory(newCategory).then(() => {
            navigate(`/categorymanager`)
        })
    }



    return (

        <form>
            <h2 className="header">Add a new category to the list</h2>
            <div className="form-container">
                <div className="form-box">


                    <fieldset>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={category?.name}
                                onChange={(evt) => {
                                    const copy = { ...category }
                                    copy.name = evt.target.value
                                    setAllCategories(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <button onClick={handleSave}
                                className="new-category-button">Save Category</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        </form>
    )
}
