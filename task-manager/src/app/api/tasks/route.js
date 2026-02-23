import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseClient";
import { collection, addDoc, getDocs , query, where , or, doc , deleteDoc , updateDoc} from "firebase/firestore";

//create task
export async function POST(req) {
  try {
    const body = await req.json();

    const docRef = await addDoc(collection(db, "tasks"), {
      ...body,
      createdAt: new Date(),
    });
    

    return NextResponse.json({
      id: docRef.id,
      ...body,
      createdAt: new Date(),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//get tasks
import { doc, getDoc, collection, query, where, or, getDocs } from "firebase/firestore";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { error: "Missing uid" },
        { status: 400 }
      );
    }

    
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userData = userSnap.data();
    const role = userData.role;

    const tasksRef = collection(db, "tasks");

    let snapshot;

    
    if (role === "admin") {
      snapshot = await getDocs(tasksRef);
    } 
    
    else {
      const q = query(
        tasksRef,
        or(
          where("ownerId", "==", uid),
          where("assignedTo", "==", uid)
        )
      );

      snapshot = await getDocs(q);
    }

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(tasks);

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

//update tasks
export async function PATCH(req) {
  try {
    const { id, updates } = await req.json();

    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updates);

    return NextResponse.json({ id, ...updates });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}