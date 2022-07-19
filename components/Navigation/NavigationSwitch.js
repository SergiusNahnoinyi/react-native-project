import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { changeUserStatus } from "../../redux/auth/authOperations";

import { AuthStackNavigator } from "./AuthStackNavigator";
import { BottomTabNavigator } from "./BottomTabNavigator";

export function NavigationSwitch() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(changeUserStatus());
  }, []);

  return (
    <NavigationContainer>
      {!isAuthorized ? <AuthStackNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
}
