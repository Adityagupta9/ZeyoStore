import axios from "axios";
import { useEffect,useState }  from "react";

const useCategory = ()=>{
    const[categories,setCategories] = useState([]);

    const getCategories = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);
            setCategories(data?.categoryList)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategories();
    },[])
    return categories;
}

export default  useCategory;