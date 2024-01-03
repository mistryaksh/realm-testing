import React, { useCallback, useEffect } from "react";
import * as Realm from "realm-web";
import { useAppDispatch } from "../../redux";
import {
  handleAge,
  handleAuthUser,
  handleClient,
  handleData,
  handleId,
  handleNameInput,
  resetInputs,
  useAuthSlice,
  useDataSlice,
} from "../../redux/slice";
const app = new Realm.App({ id: "revolution_educational-ttenr" });

export const Homepage = () => {
  const dispatch = useAppDispatch();
  const { data, inputs } = useDataSlice();
  const { user: sliceUser, client } = useAuthSlice();
  useEffect(() => {
    if (client) {
      (async () => {
        const dogs = await client?.db("test").collection("Dog").find();
        if (dogs?.length) {
          dispatch(handleData(dogs));
        }
      })();
    }
    if (
      localStorage.getItem(
        "realm-web:app(revolution_educational-ttenr):user(6593c29547efd477adc8712c):accessToken"
      )
    ) {
      dispatch(handleAuthUser(app.currentUser));
    }
  }, [dispatch, client]);

  const Logout = useCallback(async () => {
    await app.currentUser?.logOut();
    dispatch(handleAuthUser(null));
    dispatch(handleClient(undefined));
  }, [app, dispatch]);

  const LogIn = useCallback(
    async ({ email, pass }: { email: string; pass: string }) => {
      dispatch(
        handleAuthUser(
          await app.logIn(Realm.Credentials.emailPassword(email, pass))
        )
      );
      const client = app?.currentUser?.mongoClient("mongodb-atlas");
      dispatch(handleClient(client));
    },
    [client, dispatch]
  );

  const NewData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.name || !inputs.age || !inputs._id) {
      console.log("ERROR :- MISSING FIELDS");
    } else {
      await client
        ?.db("test")
        .collection("Dog")
        .insertOne({
          _id: parseInt(inputs._id),
          name: inputs.name,
          age: parseInt(inputs.age),
        });
      const dogs = await client?.db("test").collection("Dog").find();
      dispatch(handleData(dogs));
      dispatch(resetInputs());
    }
  };

  const Delete = async (data: any) => {
    await client?.db("test").collection("Dog").deleteOne(data);
    const dogs = await client?.db("test").collection("Dog").find();
    if (dogs?.length) {
      dispatch(handleData(dogs));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg shadow-lg w-[50%] p-5">
        <div className="flex gap-0 items-center justify-between">
          <h6 className="text-3xl">Mongo DB Atlas - {app.currentUser?.id}</h6>
          {!sliceUser ? (
            <button
              className="bg-indigo-500 px-5 text-white rounded-lg py-2"
              onClick={() =>
                LogIn({ email: "mistryaksh1998@gmail.com", pass: "abc123" })
              }
            >
              sign in
            </button>
          ) : (
            <button
              className="bg-indigo-500 px-5 text-white rounded-lg py-2"
              onClick={Logout}
            >
              Sign out
            </button>
          )}
        </div>
        {sliceUser && (
          <form onSubmit={(e) => NewData(e)} className="flex flex-col gap-5">
            <div className="flex w-full flex-col">
              <label htmlFor="name" className="capitalize">
                name{" "}
              </label>
              <input
                type="text"
                className="border px-5 py-1 rounded-md"
                value={inputs.name}
                onChange={(e) => dispatch(handleNameInput(e.target.value))}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="age" className="capitalize">
                age{" "}
              </label>
              <input
                type="text"
                className="border px-5 py-1 rounded-md"
                value={inputs.age}
                onChange={(e) => dispatch(handleAge(e.target.value))}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="name" className="capitalize">
                ID{" "}
              </label>
              <input
                type="text"
                className="border px-5 py-1 rounded-md"
                value={inputs._id}
                onChange={(e) => dispatch(handleId(e.target.value))}
              />
            </div>
            <button
              type="submit"
              className="border bg-gray-300 rounded-md py-1 text-sm uppercase"
            >
              Add new
            </button>
          </form>
        )}
        {sliceUser &&
          data.length !== 0 &&
          data.map(({ name, age, _id }) => (
            <div key={_id} className="flex items-center justify-between">
              <h6 className="text-xl">
                {name} & age is {age}
              </h6>
              <button onClick={() => Delete({ name, age, _id })}>delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};
