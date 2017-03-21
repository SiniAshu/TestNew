using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace BrokerageOnline.DataAccess
{
    public static class Conversion
    {
        /// <summary>
        /// convert datareader to list<T>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dr"></param>
        /// <returns>T is return type(ClassName) and dr is parameter to mapping DataReader</returns>
        public static List<T> ConvertDataReaderToList<T>(IDataReader dr)
        {
            T obj = default(T);
            List<T> list = new List<T>();
            while (dr.Read())
            {
                obj = Activator.CreateInstance<T>();
                foreach (PropertyInfo prop in obj.GetType().GetProperties())
                {
                    if (!object.Equals(dr[prop.Name], DBNull.Value))
                    {
                        prop.SetValue(obj, dr[prop.Name], null);
                    }
                }
                list.Add(obj);
            }
            return list;
        }


        /// <summary>
        /// convert collection to XML<T>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dr"></param>
        /// <returns>T is return type(ClassName) and dr is parameter to mapping DataReader</returns>
        internal static string ConvertCollectionToXML(object objCollection)
        {
            string VALS = string.Empty;
            if (objCollection != null)
            {
                Stream st = new MemoryStream();
                TextWriter tw = new StreamWriter(st);

                System.Xml.Serialization.XmlSerializer x = new System.Xml.Serialization.XmlSerializer(objCollection.GetType());
                x.Serialize(tw, objCollection);
                st.Position = 0;
                XmlTextWriter xTw = new XmlTextWriter(tw);
                XmlTextReader rdr = new XmlTextReader(st);
                XmlDocument doc = new XmlDocument();
                doc.Load(rdr);
                VALS = (doc).InnerXml;
            }
            return VALS;
        }
    }
}
