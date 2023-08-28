package com.example.nutrilifeserver.model;

import java.security.NoSuchAlgorithmException;
import java.security.MessageDigest;

public class MD5
{
    public String EncryptPassword(String password)
    {
        try
        {
            MessageDigest m = MessageDigest.getInstance("MD5");
            m.update(password.getBytes());

            /* Convert the hash value into bytes */
            byte[] bytes = m.digest();

            /* The bytes array has bytes in decimal form. Converting it into hexadecimal format. */
            StringBuilder encryptedPassword = new StringBuilder();
            for (byte aByte : bytes) {
                encryptedPassword.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
            }

            /* Complete hashed password in hexadecimal format */
            return encryptedPassword.toString();
        }
        catch (NoSuchAlgorithmException e)
        {
            e.printStackTrace();
            return null;
        }
    }
}