import React, {useContext} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {privateRoutes} from "../routes";
import {publicRoutes} from "../routes";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";


const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ? (
        <Routes>
            {privateRoutes.map((elem) => {
                const {path, Component} = elem;
                return <Route key={path} path={path} element={<Component/>}/>
            })}
            <Route path='*' element={<Navigate to={'/chat'} replace />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((elem) => {
                const {path, Component} = elem;
                console.log(Component)
                return <Route key={path} path={path} element={<Component/>}/>
            })}
            <Route path='*' element={<Navigate to={'/login'} replace />} />
        </Routes>
    )
}

export default AppRouter;