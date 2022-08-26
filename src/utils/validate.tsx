import { object, string } from 'zod';

export const formSchema = object({
  sip_uri: string().nonempty("SIP URI is required"),
  sip_password: string().nonempty("SIP Password is required"),
  web_socket_uri: string().nonempty("Wed Socket URI is required"),
});