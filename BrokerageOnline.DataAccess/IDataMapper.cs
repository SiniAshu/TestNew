using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.DataAccess
{
    public abstract class IDataMapper<T>
    {
        /// <summary>
        /// Default select method for type T
        /// </summary>
        /// <param name="exError">Out exception object</param>
        /// <returns>List of type T</returns>
        public abstract List<T> Get(out Exception exError);

        /// <summary>
        /// Default read method for type T 
        /// </summary>
        /// <param name="ID">ID of instance to read</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>Instance of type T</returns>
        public abstract T Get(Int64 ID, out Exception exError);

        /// <summary>
        /// Default read method for type T 
        /// </summary>
        /// <param name="instance">Object of instance to read</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>Instance of type T</returns>
        public abstract T Get(T instance, out Exception exError);

        /// <summary>
        /// Default Search method for ID
        /// </summary>
        /// <param name="instance">Object of instance to Search</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>List of T</returns>
        public abstract List<T> GetListByID(Int64 ID, out Exception exError);

        /// <summary>
        /// Default Search method for type T
        /// </summary>
        /// <param name="instance">Object of instance to Search</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>List of T</returns>
        public abstract List<T> GetList(T instance, out Exception exError);

        /// <summary>
        /// Default Search method for Search string
        /// </summary>
        /// <param name="instance">Object of instance to Search</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>List of T</returns>
        public abstract List<T> Search(string searchText, out Exception exError);

        /// <summary>
        /// Search for scheme and category based on Memo Type
        /// </summary>
        /// <param name="searchText"></param>
        /// <param name="MemoTypeID"></param>
        /// <param name="exError"></param>
        /// <returns></returns>
        public abstract List<T> SearchByMemoType(string searchText, Int64 MemoTypeID, out Exception exError);

        /// <summary>
        /// SearchByMemoTypeAndIsclosed
        /// </summary>
        /// <param name="searchText"></param>
        /// <param name="MemoTypeID"></param>
        /// <param name="IsCloseEnded"></param>
        /// <param name="exError"></param>
        /// <returns></returns>
        public abstract List<T> SearchByMemoTypeAndIsclosed(string searchText, Int64 MemoTypeID, Int64 IsCloseEnded, out Exception exError);

        /// <summary>
        /// Default Search method for Search string
        /// </summary>
        /// <param name="instance">Object of instance to Search</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>List of T</returns>
        public abstract List<T> Get(string ArnNo, string Channel, string DistributorCategory, out Exception exError);

        /// <summary>
        /// Default create method for type T
        /// </summary>
        /// <param name="instance">The instance to create</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>Boolean success/failure</returns>
        public abstract bool Create(T instance, out Exception exError);

        /// <summary>
        /// Default update method for type T
        /// </summary>
        /// <param name="instance">Object of instance to update</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>Instance of type T</returns>
        public abstract bool Update(T instance, out Exception exError);

        /// <summary>
        /// Default delete method for type T 
        /// </summary>
        /// <param name="ID">ID of instance to delete</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>Boolean success/failure</returns>
        public abstract bool Delete(int ID, out Exception exError);

        /// <summary>
        /// Default delete method for type T 
        /// </summary>
        /// <param name="instance">Object of instance to delete</param>
        /// <param name="exError">Out exception object</param>
        /// <returns>Boolean success/failure</returns>
        public abstract bool Delete(T instance, out Exception exError);
    }
}
