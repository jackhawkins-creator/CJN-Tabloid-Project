import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GetCategoryById, updateCategory } from "../managers/categoryManager"




export const EditCategoryForm = ({}) => {

    const  [category, setCategory ] = useState({ name: "" })

    const navigate = useNavigate()

    const { id } = useParams()

   
    useEffect(() => {
    GetCategoryById(id).then((data) => {
        const categoryObj = data
        setCategory(categoryObj)
    })
}, [id])




const handleSave = (evt) => {
    evt.preventDefault()

    const editedCategory = {
        id: category.id,
        name: category.name,
       

    }
    updateCategory(editedCategory).then(() => {
        navigate(`/categorymanager`)
    })
}



    return (
   
        <form className="profile">    
        <h2 className="header">Edit Category</h2>
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
                            setCategory(copy)
                        } }
                        required
                        className="form-container" />
                </div>
            </fieldset>

                <fieldset>
                    <div className="form-group">
                        <button onClick={handleSave}
                            className="edit-button">Save Category</button>
                    </div>
                </fieldset>
               </div>   
            </div>
        </form>
    )
}
