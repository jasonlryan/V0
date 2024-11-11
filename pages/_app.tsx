import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { Provider } from "react-redux";
import { store } from "@/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationProvider>
          <Component {...pageProps} />
        </NavigationProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
