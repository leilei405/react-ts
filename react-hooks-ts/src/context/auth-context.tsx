import React, {  } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { AppProvidersProps } from 'context/index'
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useQueryClient } from "react-query";

interface AuthForm {
  username: string;
  password: string;
}

// 拿着token获得user信息
const bootstrapUser = async () => {
  let user = null;
  // getToken 获取token值
  const token = auth.getToken()
  if (token) {
    // me api包含返回user信息
    const data = await http('me', {token})
    // console.log(data, '---user/me---');
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<
    {
      user: User | null,
      register: (form: AuthForm) => Promise<void>,
      login: (form: AuthForm) => Promise<void>,
      logout: () => Promise<void>,
    } | undefined>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({children}: AppProvidersProps) => {
  const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>();
  const queryClient = useQueryClient();
  // const [user, setUser]= useState<User | null>(null);
  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => {
    setUser(null)
    queryClient.clear();
  });

  useMount(() => {
    // bootstrapUser().then(setUser)
    run(bootstrapUser());
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error}/>
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
};



export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
