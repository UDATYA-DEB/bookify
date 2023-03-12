import { initializeApp } from 'firebase/app'
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        GoogleAuthProvider, 
        signInWithPopup,
        onAuthStateChanged,
        signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const FirebaseContext = createContext(null);
export const useFirebase = ()=>{
    return useContext(FirebaseContext);
}

const firebaseConfig = {
    apiKey: "AIzaSyB0oTD_jhYaYgnqoAI2XKx_HCGRLPMa7W4",
    authDomain: "bookify-b83c2.firebaseapp.com",
    projectId: "bookify-b83c2",
    storageBucket: "bookify-b83c2.appspot.com",
    messagingSenderId: "304334259686",
    appId: "1:304334259686:web:9357fe6943f7b03f3fc227"
};

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)


export const FirebaseProvider = (props)=>{
    const [user, setUser] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth, (cust)=>{
            if (cust){
                setUser(cust)
            } else {
                setUser(null)
            }
        })
    },[])

    const createUser = ({email, pass})=>{
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    
    const loginUser = ({email, pass})=>{
        return signInWithEmailAndPassword(auth, email, pass)
    }
    
    const googleAuth = ()=>{
        return signInWithPopup(auth, googleProvider)
    }
    
    const logOut = ()=>{
        signOut(auth)
    }

    const addNewBookDataToFirebase = async ({name, isbn, price, coverPic})=>{
        const imageRef = ref(storage, `uploads/images/books/${Date.now()}-${name}`)
        const imagePathInStorage = await uploadBytes(imageRef, coverPic)
        
        addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            imageURL: imagePathInStorage.ref.fullPath,
            uid: user.uid,
            userEmail: user.email,
            userName: user.displayName,
            uploadDate: Date.now()
        }).then((docRef)=>{
            alert("Submission Success")
            console.log(docRef)
        }).catch((err)=>{
            alert(err)
        })
    }

    const listAllBooks = ()=>{
        return getDocs(collection(firestore, 'books'))
    }

    const getImage = (path)=>{
        return getDownloadURL(ref(storage, path))
    }

    const isLoggedIn = user ? true : false;
    return <FirebaseContext.Provider value={{getImage, listAllBooks, user, createUser, loginUser, googleAuth, isLoggedIn, logOut, addNewBookDataToFirebase}}>
        {props.children}
    </FirebaseContext.Provider>
}
