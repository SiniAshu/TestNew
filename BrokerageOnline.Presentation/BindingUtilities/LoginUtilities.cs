using BrokerageOnline.Presentation.SecurityServiceRef;
using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace BrokerageOnline.Presentation.BindingUtilities
{
    public class LoginUtilities
    {
        public static bool AuthenticateUser(Credentials Credential, out string error, out string ReturnURL)
        {
            SecurityServiceClient pxy = new SecurityServiceClient();
            return pxy.AuthenticateUser(Credential, out error, out ReturnURL);
        }

        public static bool ResetPassword(Credentials credential, out string error)
        {
            SecurityServiceClient pxy = new SecurityServiceClient();
            return pxy.ResetPassword(credential, out error);
        }

        public static string GetUserID(string UserName)
        {
            SecurityServiceClient pxy = new SecurityServiceClient();
            return pxy.GetUserID(UserName);
        }

        #region Password Hashing and Decryption
        /// <summary>
        /// MD5 Password Hashing
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string PasswordHash(string Password)
        {

            // To calculate MD5 hash from an input password string
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(Password);
            byte[] hash = md5.ComputeHash(inputBytes);
            // convert byte array to hex string
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                //to make hex string use lower case instead of uppercase add parameter “X2″
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString();
        }

        /// <summary>
        /// Decrypt username and password for ResetPassword
        /// </summary>
        /// <param name="Value"></param>
        /// <returns></returns>
        public static string decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
        #endregion
    }
}