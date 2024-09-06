import { useEffect, useState } from "react"
import Apis, { endpoints } from "../configs/Apis";
import Spinner from "../layout/Spinner";

const Home = () => {

    const [menu, setMenu] = useState(null);

    useEffect(()=>{
        const loadMenu = async () => {
            let res = await Apis.get(endpoints['menu']);
            console.log(res)
            setMenu(res.data.data);
        }
        loadMenu();
    },[])

    if(menu == null) return <Spinner />
    
    return (
        <>
            <h1>Home</h1>
            <ul>
                {menu.map(c => <li className="m-4" key={c.id}>{c.menuName}</li>)}
            </ul>
        </>
    )
}

export default Home