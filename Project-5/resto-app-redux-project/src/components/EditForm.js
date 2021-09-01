import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';

const EditForm = () => {
    const dispatch = useDispatch();
    const selectedItem = useSelector(state => state.selectedItem);
    const {register, handleSubmit} = useForm({
        defaultValues: selectedItem
    });
    const onSubmit = data => console.log(data);

    const handleInput = (e) => {
        const name = e.target.name;
        dispatch({type:'HANDLE_INPUT', payload: {...selectedItem, [name]: e.target.value}});
    }

    return (
        <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
            <h4>{selectedItem.name}</h4>
            Name:<input {...register('name')} type="text" name="name" onChange={(e) => handleInput(e)}></input>
            Price:<input {...register('price')} type="text" name="price" onChange={(e) => handleInput(e)}></input>
            Category: <input {...register('category')} type="text" name="category" onChange={(e) => handleInput(e)}></input>
            Description: <input {...register('description')} type="text" name="description" onChange={(e) => handleInput(e)}></input>
            Image URL:<input {...register('image')} type="text" name="image" onChange={(e) => handleInput(e)}></input>
        </form>
    )

}

export default EditForm;