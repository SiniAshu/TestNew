namespace BrokerageOnline.Workflow {
    
    #line 25 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Collections;
    
    #line default
    #line hidden
    
    #line 26 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Collections.Generic;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Activities;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Activities.Expressions;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Activities.Statements;
    
    #line default
    #line hidden
    
    #line 27 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Data;
    
    #line default
    #line hidden
    
    #line 28 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Linq;
    
    #line default
    #line hidden
    
    #line 29 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Text;
    
    #line default
    #line hidden
    
    #line 30 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using BrokerageOnline.TransferObjects;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateValidation.xaml"
    using System.Activities.XamlIntegration;
    
    #line default
    #line hidden
    
    
    public partial class RackRateValidation : System.Activities.XamlIntegration.ICompiledExpressionRoot {
        
        private System.Activities.Activity rootActivity;
        
        private object dataContextActivities;
        
        private bool forImplementation = true;
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public string GetLanguage() {
            return "C#";
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public object InvokeExpression(int expressionId, System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext) {
            if ((this.rootActivity == null)) {
                this.rootActivity = this;
            }
            if ((this.dataContextActivities == null)) {
                this.dataContextActivities = RackRateValidation_TypedDataContext1.GetDataContextActivitiesHelper(this.rootActivity, this.forImplementation);
            }
            if ((expressionId == 0)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext0 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext0.GetLocation<bool>(refDataContext0.ValueType___Expr0Get, refDataContext0.ValueType___Expr0Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 1)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext1 = ((RackRateValidation_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext1.ValueType___Expr1Get();
            }
            if ((expressionId == 2)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext2 = ((RackRateValidation_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext2.ValueType___Expr2Get();
            }
            if ((expressionId == 3)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext3 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext3.GetLocation<BrokerageOnline.TransferObjects.ViewAction>(refDataContext3.ValueType___Expr3Get, refDataContext3.ValueType___Expr3Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 4)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext4 = ((RackRateValidation_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext4.ValueType___Expr4Get();
            }
            if ((expressionId == 5)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext5 = ((RackRateValidation_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext5.ValueType___Expr5Get();
            }
            if ((expressionId == 6)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext6 = ((RackRateValidation_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext6.ValueType___Expr6Get();
            }
            if ((expressionId == 7)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext7 = ((RackRateValidation_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext7.ValueType___Expr7Get();
            }
            if ((expressionId == 8)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext8 = ((RackRateValidation_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext8.ValueType___Expr8Get();
            }
            if ((expressionId == 9)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext9 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext9.GetLocation<bool>(refDataContext9.ValueType___Expr9Get, refDataContext9.ValueType___Expr9Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 10)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext10 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext10.GetLocation<bool>(refDataContext10.ValueType___Expr10Get, refDataContext10.ValueType___Expr10Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 11)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext11 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext11.GetLocation<bool>(refDataContext11.ValueType___Expr11Get, refDataContext11.ValueType___Expr11Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 12)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext12 = ((RackRateValidation_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext12.ValueType___Expr12Get();
            }
            if ((expressionId == 13)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext13 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext13.GetLocation<bool>(refDataContext13.ValueType___Expr13Get, refDataContext13.ValueType___Expr13Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 14)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext14 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext14.GetLocation<string>(refDataContext14.ValueType___Expr14Get, refDataContext14.ValueType___Expr14Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 15)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext15 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext15.GetLocation<bool>(refDataContext15.ValueType___Expr15Get, refDataContext15.ValueType___Expr15Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 16)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateValidation_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateValidation_TypedDataContext1(locations, activityContext, true);
                }
                RackRateValidation_TypedDataContext1 refDataContext16 = ((RackRateValidation_TypedDataContext1)(cachedCompiledDataContext[0]));
                return refDataContext16.GetLocation<bool>(refDataContext16.ValueType___Expr16Get, refDataContext16.ValueType___Expr16Set, expressionId, this.rootActivity, activityContext);
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public object InvokeExpression(int expressionId, System.Collections.Generic.IList<System.Activities.Location> locations) {
            if ((this.rootActivity == null)) {
                this.rootActivity = this;
            }
            if ((expressionId == 0)) {
                RackRateValidation_TypedDataContext1 refDataContext0 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext0.GetLocation<bool>(refDataContext0.ValueType___Expr0Get, refDataContext0.ValueType___Expr0Set);
            }
            if ((expressionId == 1)) {
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext1 = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext1.ValueType___Expr1Get();
            }
            if ((expressionId == 2)) {
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext2 = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext2.ValueType___Expr2Get();
            }
            if ((expressionId == 3)) {
                RackRateValidation_TypedDataContext1 refDataContext3 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext3.GetLocation<BrokerageOnline.TransferObjects.ViewAction>(refDataContext3.ValueType___Expr3Get, refDataContext3.ValueType___Expr3Set);
            }
            if ((expressionId == 4)) {
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext4 = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext4.ValueType___Expr4Get();
            }
            if ((expressionId == 5)) {
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext5 = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext5.ValueType___Expr5Get();
            }
            if ((expressionId == 6)) {
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext6 = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext6.ValueType___Expr6Get();
            }
            if ((expressionId == 7)) {
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext7 = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext7.ValueType___Expr7Get();
            }
            if ((expressionId == 8)) {
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext8 = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext8.ValueType___Expr8Get();
            }
            if ((expressionId == 9)) {
                RackRateValidation_TypedDataContext1 refDataContext9 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext9.GetLocation<bool>(refDataContext9.ValueType___Expr9Get, refDataContext9.ValueType___Expr9Set);
            }
            if ((expressionId == 10)) {
                RackRateValidation_TypedDataContext1 refDataContext10 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext10.GetLocation<bool>(refDataContext10.ValueType___Expr10Get, refDataContext10.ValueType___Expr10Set);
            }
            if ((expressionId == 11)) {
                RackRateValidation_TypedDataContext1 refDataContext11 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext11.GetLocation<bool>(refDataContext11.ValueType___Expr11Get, refDataContext11.ValueType___Expr11Set);
            }
            if ((expressionId == 12)) {
                RackRateValidation_TypedDataContext1_ForReadOnly valDataContext12 = new RackRateValidation_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext12.ValueType___Expr12Get();
            }
            if ((expressionId == 13)) {
                RackRateValidation_TypedDataContext1 refDataContext13 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext13.GetLocation<bool>(refDataContext13.ValueType___Expr13Get, refDataContext13.ValueType___Expr13Set);
            }
            if ((expressionId == 14)) {
                RackRateValidation_TypedDataContext1 refDataContext14 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext14.GetLocation<string>(refDataContext14.ValueType___Expr14Get, refDataContext14.ValueType___Expr14Set);
            }
            if ((expressionId == 15)) {
                RackRateValidation_TypedDataContext1 refDataContext15 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext15.GetLocation<bool>(refDataContext15.ValueType___Expr15Get, refDataContext15.ValueType___Expr15Set);
            }
            if ((expressionId == 16)) {
                RackRateValidation_TypedDataContext1 refDataContext16 = new RackRateValidation_TypedDataContext1(locations, true);
                return refDataContext16.GetLocation<bool>(refDataContext16.ValueType___Expr16Get, refDataContext16.ValueType___Expr16Set);
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public bool CanExecuteExpression(string expressionText, bool isReference, System.Collections.Generic.IList<System.Activities.LocationReference> locations, out int expressionId) {
            if (((isReference == true) 
                        && ((expressionText == "Allow") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 0;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "Status == \"Reviewed\"") 
                        && (RackRateValidation_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 1;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "UserID") 
                        && (RackRateValidation_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 2;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "MemoDetail") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 3;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "new HelperClass.RackRate()") 
                        && (RackRateValidation_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 4;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "PaymentMemoID") 
                        && (RackRateValidation_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 5;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoDetail.CurrentUserRole == 3 || MemoDetail.CurrentUserRole ==10") 
                        && (RackRateValidation_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 6;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoDetail.CurrentUserRole == 3") 
                        && (RackRateValidation_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 7;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoDetail.ModifiedByRole == MemoDetail.CurrentUserRole") 
                        && (RackRateValidation_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 8;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Allow") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 9;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Allow") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 10;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Allow") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 11;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoDetail.CreatedBy == UserID") 
                        && (RackRateValidation_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 12;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Allow") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 13;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Error") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 14;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Allow") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 15;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Allow") 
                        && (RackRateValidation_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 16;
                return true;
            }
            expressionId = -1;
            return false;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public System.Collections.Generic.IList<string> GetRequiredLocations(int expressionId) {
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public System.Linq.Expressions.Expression GetExpressionTreeForExpression(int expressionId, System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) {
            if ((expressionId == 0)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr0GetTree();
            }
            if ((expressionId == 1)) {
                return new RackRateValidation_TypedDataContext1_ForReadOnly(locationReferences).@__Expr1GetTree();
            }
            if ((expressionId == 2)) {
                return new RackRateValidation_TypedDataContext1_ForReadOnly(locationReferences).@__Expr2GetTree();
            }
            if ((expressionId == 3)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr3GetTree();
            }
            if ((expressionId == 4)) {
                return new RackRateValidation_TypedDataContext1_ForReadOnly(locationReferences).@__Expr4GetTree();
            }
            if ((expressionId == 5)) {
                return new RackRateValidation_TypedDataContext1_ForReadOnly(locationReferences).@__Expr5GetTree();
            }
            if ((expressionId == 6)) {
                return new RackRateValidation_TypedDataContext1_ForReadOnly(locationReferences).@__Expr6GetTree();
            }
            if ((expressionId == 7)) {
                return new RackRateValidation_TypedDataContext1_ForReadOnly(locationReferences).@__Expr7GetTree();
            }
            if ((expressionId == 8)) {
                return new RackRateValidation_TypedDataContext1_ForReadOnly(locationReferences).@__Expr8GetTree();
            }
            if ((expressionId == 9)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr9GetTree();
            }
            if ((expressionId == 10)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr10GetTree();
            }
            if ((expressionId == 11)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr11GetTree();
            }
            if ((expressionId == 12)) {
                return new RackRateValidation_TypedDataContext1_ForReadOnly(locationReferences).@__Expr12GetTree();
            }
            if ((expressionId == 13)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr13GetTree();
            }
            if ((expressionId == 14)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr14GetTree();
            }
            if ((expressionId == 15)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr15GetTree();
            }
            if ((expressionId == 16)) {
                return new RackRateValidation_TypedDataContext1(locationReferences).@__Expr16GetTree();
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class RackRateValidation_TypedDataContext0 : System.Activities.XamlIntegration.CompiledDataContext {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            public RackRateValidation_TypedDataContext0(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateValidation_TypedDataContext0(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateValidation_TypedDataContext0(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            internal static object GetDataContextActivitiesHelper(System.Activities.Activity compiledRoot, bool forImplementation) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetDataContextActivities(compiledRoot, forImplementation);
            }
            
            internal static System.Activities.XamlIntegration.CompiledDataContext[] GetCompiledDataContextCacheHelper(object dataContextActivities, System.Activities.ActivityContext activityContext, System.Activities.Activity compiledRoot, bool forImplementation, int compiledDataContextCount) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetCompiledDataContextCache(dataContextActivities, activityContext, compiledRoot, forImplementation, compiledDataContextCount);
            }
            
            public virtual void SetLocationsOffset(int locationsOffsetValue) {
                locationsOffset = locationsOffsetValue;
            }
            
            public static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 0))) {
                    return false;
                }
                expectedLocationsCount = 0;
                return true;
            }
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class RackRateValidation_TypedDataContext0_ForReadOnly : System.Activities.XamlIntegration.CompiledDataContext {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            public RackRateValidation_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateValidation_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateValidation_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            internal static object GetDataContextActivitiesHelper(System.Activities.Activity compiledRoot, bool forImplementation) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetDataContextActivities(compiledRoot, forImplementation);
            }
            
            internal static System.Activities.XamlIntegration.CompiledDataContext[] GetCompiledDataContextCacheHelper(object dataContextActivities, System.Activities.ActivityContext activityContext, System.Activities.Activity compiledRoot, bool forImplementation, int compiledDataContextCount) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetCompiledDataContextCache(dataContextActivities, activityContext, compiledRoot, forImplementation, compiledDataContextCount);
            }
            
            public virtual void SetLocationsOffset(int locationsOffsetValue) {
                locationsOffset = locationsOffsetValue;
            }
            
            public static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 0))) {
                    return false;
                }
                expectedLocationsCount = 0;
                return true;
            }
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class RackRateValidation_TypedDataContext1 : RackRateValidation_TypedDataContext0 {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected bool Allow;
            
            protected int UserID;
            
            protected int PaymentMemoID;
            
            public RackRateValidation_TypedDataContext1(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateValidation_TypedDataContext1(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateValidation_TypedDataContext1(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            protected BrokerageOnline.TransferObjects.ViewAction MemoDetail {
                get {
                    return ((BrokerageOnline.TransferObjects.ViewAction)(this.GetVariableValue((2 + locationsOffset))));
                }
                set {
                    this.SetVariableValue((2 + locationsOffset), value);
                }
            }
            
            protected string Status {
                get {
                    return ((string)(this.GetVariableValue((3 + locationsOffset))));
                }
                set {
                    this.SetVariableValue((3 + locationsOffset), value);
                }
            }
            
            protected string Error {
                get {
                    return ((string)(this.GetVariableValue((5 + locationsOffset))));
                }
                set {
                    this.SetVariableValue((5 + locationsOffset), value);
                }
            }
            
            internal new static System.Activities.XamlIntegration.CompiledDataContext[] GetCompiledDataContextCacheHelper(object dataContextActivities, System.Activities.ActivityContext activityContext, System.Activities.Activity compiledRoot, bool forImplementation, int compiledDataContextCount) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetCompiledDataContextCache(dataContextActivities, activityContext, compiledRoot, forImplementation, compiledDataContextCount);
            }
            
            public new virtual void SetLocationsOffset(int locationsOffsetValue) {
                locationsOffset = locationsOffsetValue;
                base.SetLocationsOffset(locationsOffset);
            }
            
            internal System.Linq.Expressions.Expression @__Expr0GetTree() {
                
                #line 65 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
          Allow;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr0Get() {
                
                #line 65 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
          Allow;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr0Get() {
                this.GetValueTypeValues();
                return this.@__Expr0Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr0Set(bool value) {
                
                #line 65 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
          Allow = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr0Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr0Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr3GetTree() {
                
                #line 83 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<BrokerageOnline.TransferObjects.ViewAction>> expression = () => 
                MemoDetail;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public BrokerageOnline.TransferObjects.ViewAction @__Expr3Get() {
                
                #line 83 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                MemoDetail;
                
                #line default
                #line hidden
            }
            
            public BrokerageOnline.TransferObjects.ViewAction ValueType___Expr3Get() {
                this.GetValueTypeValues();
                return this.@__Expr3Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr3Set(BrokerageOnline.TransferObjects.ViewAction value) {
                
                #line 83 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
                MemoDetail = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr3Set(BrokerageOnline.TransferObjects.ViewAction value) {
                this.GetValueTypeValues();
                this.@__Expr3Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr9GetTree() {
                
                #line 122 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                            Allow;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr9Get() {
                
                #line 122 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                            Allow;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr9Get() {
                this.GetValueTypeValues();
                return this.@__Expr9Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr9Set(bool value) {
                
                #line 122 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
                            Allow = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr9Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr9Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr10GetTree() {
                
                #line 135 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                            Allow;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr10Get() {
                
                #line 135 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                            Allow;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr10Get() {
                this.GetValueTypeValues();
                return this.@__Expr10Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr10Set(bool value) {
                
                #line 135 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
                            Allow = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr10Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr10Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr11GetTree() {
                
                #line 151 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                        Allow;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr11Get() {
                
                #line 151 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                        Allow;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr11Get() {
                this.GetValueTypeValues();
                return this.@__Expr11Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr11Set(bool value) {
                
                #line 151 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
                        Allow = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr11Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr11Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr13GetTree() {
                
                #line 175 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                          Allow;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr13Get() {
                
                #line 175 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                          Allow;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr13Get() {
                this.GetValueTypeValues();
                return this.@__Expr13Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr13Set(bool value) {
                
                #line 175 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
                          Allow = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr13Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr13Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr14GetTree() {
                
                #line 185 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<string>> expression = () => 
                          Error;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public string @__Expr14Get() {
                
                #line 185 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                          Error;
                
                #line default
                #line hidden
            }
            
            public string ValueType___Expr14Get() {
                this.GetValueTypeValues();
                return this.@__Expr14Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr14Set(string value) {
                
                #line 185 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
                          Error = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr14Set(string value) {
                this.GetValueTypeValues();
                this.@__Expr14Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr15GetTree() {
                
                #line 198 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                        Allow;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr15Get() {
                
                #line 198 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                        Allow;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr15Get() {
                this.GetValueTypeValues();
                return this.@__Expr15Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr15Set(bool value) {
                
                #line 198 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
                        Allow = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr15Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr15Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr16GetTree() {
                
                #line 215 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
              Allow;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr16Get() {
                
                #line 215 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
              Allow;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr16Get() {
                this.GetValueTypeValues();
                return this.@__Expr16Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr16Set(bool value) {
                
                #line 215 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                
              Allow = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr16Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr16Set(value);
                this.SetValueTypeValues();
            }
            
            protected override void GetValueTypeValues() {
                this.Allow = ((bool)(this.GetVariableValue((0 + locationsOffset))));
                this.UserID = ((int)(this.GetVariableValue((1 + locationsOffset))));
                this.PaymentMemoID = ((int)(this.GetVariableValue((4 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            protected override void SetValueTypeValues() {
                this.SetVariableValue((0 + locationsOffset), this.Allow);
                this.SetVariableValue((1 + locationsOffset), this.UserID);
                this.SetVariableValue((4 + locationsOffset), this.PaymentMemoID);
                base.SetValueTypeValues();
            }
            
            public new static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 6))) {
                    return false;
                }
                if ((validateLocationCount == true)) {
                    offset = (locationReferences.Count - 6);
                }
                expectedLocationsCount = 6;
                if (((locationReferences[(offset + 2)].Name != "MemoDetail") 
                            || (locationReferences[(offset + 2)].Type != typeof(BrokerageOnline.TransferObjects.ViewAction)))) {
                    return false;
                }
                if (((locationReferences[(offset + 3)].Name != "Status") 
                            || (locationReferences[(offset + 3)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 5)].Name != "Error") 
                            || (locationReferences[(offset + 5)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 0)].Name != "Allow") 
                            || (locationReferences[(offset + 0)].Type != typeof(bool)))) {
                    return false;
                }
                if (((locationReferences[(offset + 1)].Name != "UserID") 
                            || (locationReferences[(offset + 1)].Type != typeof(int)))) {
                    return false;
                }
                if (((locationReferences[(offset + 4)].Name != "PaymentMemoID") 
                            || (locationReferences[(offset + 4)].Type != typeof(int)))) {
                    return false;
                }
                return RackRateValidation_TypedDataContext0.Validate(locationReferences, false, offset);
            }
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class RackRateValidation_TypedDataContext1_ForReadOnly : RackRateValidation_TypedDataContext0_ForReadOnly {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected bool Allow;
            
            protected int UserID;
            
            protected int PaymentMemoID;
            
            public RackRateValidation_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateValidation_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateValidation_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            protected BrokerageOnline.TransferObjects.ViewAction MemoDetail {
                get {
                    return ((BrokerageOnline.TransferObjects.ViewAction)(this.GetVariableValue((2 + locationsOffset))));
                }
            }
            
            protected string Status {
                get {
                    return ((string)(this.GetVariableValue((3 + locationsOffset))));
                }
            }
            
            protected string Error {
                get {
                    return ((string)(this.GetVariableValue((5 + locationsOffset))));
                }
            }
            
            internal new static System.Activities.XamlIntegration.CompiledDataContext[] GetCompiledDataContextCacheHelper(object dataContextActivities, System.Activities.ActivityContext activityContext, System.Activities.Activity compiledRoot, bool forImplementation, int compiledDataContextCount) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetCompiledDataContextCache(dataContextActivities, activityContext, compiledRoot, forImplementation, compiledDataContextCount);
            }
            
            public new virtual void SetLocationsOffset(int locationsOffsetValue) {
                locationsOffset = locationsOffsetValue;
                base.SetLocationsOffset(locationsOffset);
            }
            
            internal System.Linq.Expressions.Expression @__Expr1GetTree() {
                
                #line 75 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
          Status == "Reviewed";
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr1Get() {
                
                #line 75 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
          Status == "Reviewed";
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr1Get() {
                this.GetValueTypeValues();
                return this.@__Expr1Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr2GetTree() {
                
                #line 95 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<int>> expression = () => 
              UserID;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public int @__Expr2Get() {
                
                #line 95 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
              UserID;
                
                #line default
                #line hidden
            }
            
            public int ValueType___Expr2Get() {
                this.GetValueTypeValues();
                return this.@__Expr2Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr4GetTree() {
                
                #line 88 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<BrokerageOnline.Workflow.HelperClass.RackRate>> expression = () => 
                new HelperClass.RackRate();
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public BrokerageOnline.Workflow.HelperClass.RackRate @__Expr4Get() {
                
                #line 88 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                new HelperClass.RackRate();
                
                #line default
                #line hidden
            }
            
            public BrokerageOnline.Workflow.HelperClass.RackRate ValueType___Expr4Get() {
                this.GetValueTypeValues();
                return this.@__Expr4Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr5GetTree() {
                
                #line 92 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<int>> expression = () => 
              PaymentMemoID;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public int @__Expr5Get() {
                
                #line 92 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
              PaymentMemoID;
                
                #line default
                #line hidden
            }
            
            public int ValueType___Expr5Get() {
                this.GetValueTypeValues();
                return this.@__Expr5Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr6GetTree() {
                
                #line 101 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                MemoDetail.CurrentUserRole == 3 || MemoDetail.CurrentUserRole ==10;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr6Get() {
                
                #line 101 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                MemoDetail.CurrentUserRole == 3 || MemoDetail.CurrentUserRole ==10;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr6Get() {
                this.GetValueTypeValues();
                return this.@__Expr6Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr7GetTree() {
                
                #line 108 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                    MemoDetail.CurrentUserRole == 3;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr7Get() {
                
                #line 108 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                    MemoDetail.CurrentUserRole == 3;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr7Get() {
                this.GetValueTypeValues();
                return this.@__Expr7Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr8GetTree() {
                
                #line 115 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                        MemoDetail.ModifiedByRole == MemoDetail.CurrentUserRole;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr8Get() {
                
                #line 115 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                        MemoDetail.ModifiedByRole == MemoDetail.CurrentUserRole;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr8Get() {
                this.GetValueTypeValues();
                return this.@__Expr8Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr12GetTree() {
                
                #line 167 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                    MemoDetail.CreatedBy == UserID;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr12Get() {
                
                #line 167 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATEVALIDATION.XAML"
                return 
                    MemoDetail.CreatedBy == UserID;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr12Get() {
                this.GetValueTypeValues();
                return this.@__Expr12Get();
            }
            
            protected override void GetValueTypeValues() {
                this.Allow = ((bool)(this.GetVariableValue((0 + locationsOffset))));
                this.UserID = ((int)(this.GetVariableValue((1 + locationsOffset))));
                this.PaymentMemoID = ((int)(this.GetVariableValue((4 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            public new static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 6))) {
                    return false;
                }
                if ((validateLocationCount == true)) {
                    offset = (locationReferences.Count - 6);
                }
                expectedLocationsCount = 6;
                if (((locationReferences[(offset + 2)].Name != "MemoDetail") 
                            || (locationReferences[(offset + 2)].Type != typeof(BrokerageOnline.TransferObjects.ViewAction)))) {
                    return false;
                }
                if (((locationReferences[(offset + 3)].Name != "Status") 
                            || (locationReferences[(offset + 3)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 5)].Name != "Error") 
                            || (locationReferences[(offset + 5)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 0)].Name != "Allow") 
                            || (locationReferences[(offset + 0)].Type != typeof(bool)))) {
                    return false;
                }
                if (((locationReferences[(offset + 1)].Name != "UserID") 
                            || (locationReferences[(offset + 1)].Type != typeof(int)))) {
                    return false;
                }
                if (((locationReferences[(offset + 4)].Name != "PaymentMemoID") 
                            || (locationReferences[(offset + 4)].Type != typeof(int)))) {
                    return false;
                }
                return RackRateValidation_TypedDataContext0_ForReadOnly.Validate(locationReferences, false, offset);
            }
        }
    }
}
