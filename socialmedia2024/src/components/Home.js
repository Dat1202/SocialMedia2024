// import { useEffect, useState } from "react";
// import Apis, { endpoints } from "../configs/Apis";
// import Spinner from "../layout/Spinner";

// const Home = () => {
//     const [menu, setMenu] = useState(null);

//     useEffect(() => {
//         const loadMenu = async () => {
//                 let { data } = await Apis.get(endpoints['menu']);
//                 console.log(data);
//                 setMenu(data);
//             };
//             loadMenu();
//         }, []);

//     if (menu===null) return <Spinner />;

//     return (
//         <>
//             <h1>{menu.success ? (menu.data.map(m => (
//                 <p key={m.id}>{m.menuName}</p>
//             ))) : (menu.error.errorMessage)}</h1>
//         </>
//     );
// };

// export default Home;
