import firebase from "firebase";
import { v4 as uuid } from 'uuid';

export function login ({email,password}){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((value)=>console.log(value))

}

export function signup ({email,password, displayName}){
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((userInfo)=>{
        console.log(userInfo)
        userInfo.user.updateProfile({displayName: displayName.trim()})
        .then(()=>{})
    })
}

export function subscribeToAuthChanges(authStateChanged){
    firebase.auth().onAuthStateChanged((user)=>{
        console.log(user)
        authStateChanged(user)
    })
}

export function signout(onSignOut){
    firebase.auth().signOut()
    .then(()=>{
        console.log('Sign Out')
        onSignOut();
    })
}

export function uploadCake(cake, onCakeUpload, {updating}){
    if(cake.image){
        const fileExtension = cake.image.split('.').pop();
        console.log(fileExtension)

        var uuid = 'cake' + Math.round(  (Math.random() * Math.pow(10, 6)) + '' + new Date().getTime())

        const fileName = `${uuid}.${fileExtension}`

        var storageRef= firebase.storage().ref().child(`cakes.images/${fileName}`);

        storageRef.put(cake.image)
        .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                console.log('snapshot: '+snapshot.state)
                console.log('Progress'+ (snapshot.bytesTransferred/snapshot.totalBytes)*100)

                if(snapshot.state==firebase.storage.TaskState.SUCCESS){
                    console.log('Success')
                }
            },
            error => {
                unsubscribe()
                console.log('Image upload error');
            },
            () => {
                storageRef.getDownloadURL()
                .then((downloadUrl=>{
                    console.log('File Available at: '+downloadUrl)

                    // cake.image= downloadUrl;

                    if(updating){
                        console.log('updating');

                    }else{
                        console.log('adding')
                        addCategories(cake)
                    }
                }))
            }
        )
    } else{
        console.log('Skipping image upload')
        if(updating){
            console.log('updating');

        }else{
            console.log('adding')
            addCategories(cake)
        } 
    }
}

export function addCategories(category, addComplete){
    category.createdAt= firebase.firestore.FieldValue.serverTimestamp()
    firebase.firestore()
    .collection('Categories')
    .add(category)
    .then((snapshot) => {
        // snapshot.get()
        category.id=snapshot.id
        snapshot.set(category)
    })
    .then(()=>addComplete(category))
    .catch((error)=>console.log(error))
}

export function updateCake(cake, updateComplete){
    cake.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    firebase.firestore()
    .collection('Categories')
    .set(cake).doc()
    .then(()=>updateComplete(cake))
    .catch((error)=>console.log(error))
      
}

export async function getCategories(categoryRetreived){
    var cakeList = []
    var snapshot = await firebase.firestore()
    .collection('Categories')
    .get()
    snapshot.forEach((doc)=>{
        const cakeItem = doc.data();
        cakeItem.id = doc.id

        cakeList.push(cakeItem)
    })

    categoryRetreived(cakeList)
}