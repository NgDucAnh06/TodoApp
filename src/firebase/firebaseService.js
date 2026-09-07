import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const COLLECTION_NAME = 'todos';
const todosRef = collection(db, COLLECTION_NAME);

export async function fetchTodosFirebase() {
    const snapshot = await getDocs(todosRef);
    return snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
}

export async function addTodoFirebase(todo) {
    const docRef = await addDoc(todosRef, {
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        dueDate: todo.dueDate,
        completed: todo.completed,
    });
    return { ...todo, id: docRef.id };
}

export async function deleteTodoFirebase(todoId) {
    const todoDoc = doc(db, COLLECTION_NAME, todoId);
    await deleteDoc(todoDoc);
    return todoId;
}

export async function updateTodoFirebase(todoId, data) {
    const todoDoc = doc(db, COLLECTION_NAME, todoId);
    await updateDoc(todoDoc, data);
    return { ...data, id: todoId };
}
