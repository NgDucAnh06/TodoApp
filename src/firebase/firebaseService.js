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

export async function fetchTodos() {
    const snapshot = await getDocs(todosRef);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function addTodo(todo) {
    const docRef = await addDoc(todosRef, {
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        dueDate: todo.dueDate,
        completed: todo.completed,
    });
    return { id: docRef.id, ...todo };
}

export async function deleteTodo(todoId) {
    const todoDoc = doc(db, COLLECTION_NAME, todoId);
    await deleteDoc(todoDoc);
    return todoId;
}

export async function updateTodo(todoId, data) {
    const todoDoc = doc(db, COLLECTION_NAME, todoId);
    await updateDoc(todoDoc, data);
    return { id: todoId, ...data };
}
