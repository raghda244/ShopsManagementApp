import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { fireStore } from '../firebase';

export const getAllShops = async () => {
    const data = await getDocs(collection(fireStore, "shops"));
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getShopById = async (id) => {
    const res = await getDoc(doc(fireStore, 'shops', id));
    console.log(res.data())
    return res.data();
}
export const addShop = async (shopData) => {
    await addDoc(collection(fireStore, "shops"), shopData);
}

export const updateShop = async (id, data) => {
    console.log(data)
    await updateDoc(doc(fireStore, "shops", id), data);
}

export const deleteShop = (id) =>{
    return deleteDoc(doc(fireStore, 'shops', id));
}