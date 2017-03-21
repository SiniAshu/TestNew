using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Activities;

namespace BrokerageOnline.Workflow
{
    public sealed class WaitForInput<TResult> : NativeActivity<TResult>
    {
        [RequiredArgument]
        public InArgument<string> BookmarkName { get; set; }

        // indicate to the runtime that this activity can go idle
        protected override bool CanInduceIdle
        {
            get { return true; }
        }

        protected override void Execute(NativeActivityContext context)
        {
            context.CreateBookmark(this.BookmarkName.Get(context), new BookmarkCallback(OnReadComplete));
        }

        void OnReadComplete(NativeActivityContext context, Bookmark bookmark, object state)
        {
            double input = Convert.ToInt16(state);
            context.SetValue(this.Result, input);

            //this.Result.Set(context, (TResult)state);
        }
    }
}
