import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import '../styles/global.scss'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
/// CLIENT_ID AUiBTbQrW2samga_IJScDziFo4Hq3l7XPlPxSil6P3L8XT-JXXAjr47YZm0BDsFYnquP8viMDQLzJCZ_
//// SECRET ENo_iUnfw_C9mi5C9yvKSgAhODsgUiruliE_Df1HReCYxtSYyhUhoTcS4uvXI_FdGAWl97hCMHaTsUsA
////<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
const initialOptions = {
	"client-id": "AUiBTbQrW2samga_IJScDziFo4Hq3l7XPlPxSil6P3L8XT-JXXAjr47YZm0BDsFYnquP8viMDQLzJCZ_",
	currency: "BRL",
	intent: 'capture'
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<SessionProvider session={pageProps.session}>
				<PayPalScriptProvider options={initialOptions}>
					<Header />
					<Component {...pageProps} />
				</PayPalScriptProvider>
			</SessionProvider>

		</>
	)
}
