namespace BrokerageOnline.Workflow {
    
    #line 26 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Collections;
    
    #line default
    #line hidden
    
    #line 27 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Collections.Generic;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Activities;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Activities.Expressions;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Activities.Statements;
    
    #line default
    #line hidden
    
    #line 28 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Data;
    
    #line default
    #line hidden
    
    #line 29 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Linq;
    
    #line default
    #line hidden
    
    #line 30 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Text;
    
    #line default
    #line hidden
    
    #line 31 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using BrokerageOnline.TransferObjects;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\BaseRackRateView.xaml"
    using System.Activities.XamlIntegration;
    
    #line default
    #line hidden
    
    
    public partial class BaseRackRateView : System.Activities.XamlIntegration.ICompiledExpressionRoot {
        
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
                this.dataContextActivities = BaseRackRateView_TypedDataContext2.GetDataContextActivitiesHelper(this.rootActivity, this.forImplementation);
            }
            if ((expressionId == 0)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new BaseRackRateView_TypedDataContext2(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2 refDataContext0 = ((BaseRackRateView_TypedDataContext2)(cachedCompiledDataContext[0]));
                return refDataContext0.GetLocation<BrokerageOnline.TransferObjects.WorkFlowHierarchy[]>(refDataContext0.ValueType___Expr0Get, refDataContext0.ValueType___Expr0Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 1)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext1 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext1.ValueType___Expr1Get();
            }
            if ((expressionId == 2)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext2 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext2.ValueType___Expr2Get();
            }
            if ((expressionId == 3)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext3 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext3.ValueType___Expr3Get();
            }
            if ((expressionId == 4)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new BaseRackRateView_TypedDataContext2(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2 refDataContext4 = ((BaseRackRateView_TypedDataContext2)(cachedCompiledDataContext[0]));
                return refDataContext4.GetLocation<BrokerageOnline.TransferObjects.ViewAction>(refDataContext4.ValueType___Expr4Get, refDataContext4.ValueType___Expr4Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 5)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext5 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext5.ValueType___Expr5Get();
            }
            if ((expressionId == 6)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext6 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext6.ValueType___Expr6Get();
            }
            if ((expressionId == 7)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext7 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext7.ValueType___Expr7Get();
            }
            if ((expressionId == 8)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new BaseRackRateView_TypedDataContext2(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2 refDataContext8 = ((BaseRackRateView_TypedDataContext2)(cachedCompiledDataContext[0]));
                return refDataContext8.GetLocation<bool>(refDataContext8.ValueType___Expr8Get, refDataContext8.ValueType___Expr8Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 9)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext9 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext9.ValueType___Expr9Get();
            }
            if ((expressionId == 10)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext10 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext10.ValueType___Expr10Get();
            }
            if ((expressionId == 11)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new BaseRackRateView_TypedDataContext2(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2 refDataContext11 = ((BaseRackRateView_TypedDataContext2)(cachedCompiledDataContext[0]));
                return refDataContext11.GetLocation<bool>(refDataContext11.ValueType___Expr11Get, refDataContext11.ValueType___Expr11Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 12)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new BaseRackRateView_TypedDataContext2(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2 refDataContext12 = ((BaseRackRateView_TypedDataContext2)(cachedCompiledDataContext[0]));
                return refDataContext12.GetLocation<bool>(refDataContext12.ValueType___Expr12Get, refDataContext12.ValueType___Expr12Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 13)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext13 = ((BaseRackRateView_TypedDataContext2_ForReadOnly)(cachedCompiledDataContext[1]));
                return valDataContext13.ValueType___Expr13Get();
            }
            if ((expressionId == 14)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new BaseRackRateView_TypedDataContext2(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2 refDataContext14 = ((BaseRackRateView_TypedDataContext2)(cachedCompiledDataContext[0]));
                return refDataContext14.GetLocation<bool>(refDataContext14.ValueType___Expr14Get, refDataContext14.ValueType___Expr14Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 15)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = BaseRackRateView_TypedDataContext2.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new BaseRackRateView_TypedDataContext2(locations, activityContext, true);
                }
                BaseRackRateView_TypedDataContext2 refDataContext15 = ((BaseRackRateView_TypedDataContext2)(cachedCompiledDataContext[0]));
                return refDataContext15.GetLocation<bool>(refDataContext15.ValueType___Expr15Get, refDataContext15.ValueType___Expr15Set, expressionId, this.rootActivity, activityContext);
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
                BaseRackRateView_TypedDataContext2 refDataContext0 = new BaseRackRateView_TypedDataContext2(locations, true);
                return refDataContext0.GetLocation<BrokerageOnline.TransferObjects.WorkFlowHierarchy[]>(refDataContext0.ValueType___Expr0Get, refDataContext0.ValueType___Expr0Set);
            }
            if ((expressionId == 1)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext1 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext1.ValueType___Expr1Get();
            }
            if ((expressionId == 2)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext2 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext2.ValueType___Expr2Get();
            }
            if ((expressionId == 3)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext3 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext3.ValueType___Expr3Get();
            }
            if ((expressionId == 4)) {
                BaseRackRateView_TypedDataContext2 refDataContext4 = new BaseRackRateView_TypedDataContext2(locations, true);
                return refDataContext4.GetLocation<BrokerageOnline.TransferObjects.ViewAction>(refDataContext4.ValueType___Expr4Get, refDataContext4.ValueType___Expr4Set);
            }
            if ((expressionId == 5)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext5 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext5.ValueType___Expr5Get();
            }
            if ((expressionId == 6)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext6 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext6.ValueType___Expr6Get();
            }
            if ((expressionId == 7)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext7 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext7.ValueType___Expr7Get();
            }
            if ((expressionId == 8)) {
                BaseRackRateView_TypedDataContext2 refDataContext8 = new BaseRackRateView_TypedDataContext2(locations, true);
                return refDataContext8.GetLocation<bool>(refDataContext8.ValueType___Expr8Get, refDataContext8.ValueType___Expr8Set);
            }
            if ((expressionId == 9)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext9 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext9.ValueType___Expr9Get();
            }
            if ((expressionId == 10)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext10 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext10.ValueType___Expr10Get();
            }
            if ((expressionId == 11)) {
                BaseRackRateView_TypedDataContext2 refDataContext11 = new BaseRackRateView_TypedDataContext2(locations, true);
                return refDataContext11.GetLocation<bool>(refDataContext11.ValueType___Expr11Get, refDataContext11.ValueType___Expr11Set);
            }
            if ((expressionId == 12)) {
                BaseRackRateView_TypedDataContext2 refDataContext12 = new BaseRackRateView_TypedDataContext2(locations, true);
                return refDataContext12.GetLocation<bool>(refDataContext12.ValueType___Expr12Get, refDataContext12.ValueType___Expr12Set);
            }
            if ((expressionId == 13)) {
                BaseRackRateView_TypedDataContext2_ForReadOnly valDataContext13 = new BaseRackRateView_TypedDataContext2_ForReadOnly(locations, true);
                return valDataContext13.ValueType___Expr13Get();
            }
            if ((expressionId == 14)) {
                BaseRackRateView_TypedDataContext2 refDataContext14 = new BaseRackRateView_TypedDataContext2(locations, true);
                return refDataContext14.GetLocation<bool>(refDataContext14.ValueType___Expr14Get, refDataContext14.ValueType___Expr14Set);
            }
            if ((expressionId == 15)) {
                BaseRackRateView_TypedDataContext2 refDataContext15 = new BaseRackRateView_TypedDataContext2(locations, true);
                return refDataContext15.GetLocation<bool>(refDataContext15.ValueType___Expr15Get, refDataContext15.ValueType___Expr15Set);
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public bool CanExecuteExpression(string expressionText, bool isReference, System.Collections.Generic.IList<System.Activities.LocationReference> locations, out int expressionId) {
            if (((isReference == true) 
                        && ((expressionText == "WorkFlowHierarchyList") 
                        && (BaseRackRateView_TypedDataContext2.Validate(locations, true, 0) == true)))) {
                expressionId = 0;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "new HelperClass.RackRate()") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 1;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoTypeID") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 2;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "UserID") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 3;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "MemoDetail") 
                        && (BaseRackRateView_TypedDataContext2.Validate(locations, true, 0) == true)))) {
                expressionId = 4;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "new HelperClass.RackRate()") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 5;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "PaymentMemoID") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 6;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoDetail.CurrentUserRole>MemoDetail.ModifiedByRole") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 7;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "EnableAction") 
                        && (BaseRackRateView_TypedDataContext2.Validate(locations, true, 0) == true)))) {
                expressionId = 8;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoDetail.CurrentStatus==\"Initiated\"||MemoDetail.CurrentStatus==\"Reviewed\"||Memo" +
                            "Detail.CurrentStatus==\"Approved\"") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 9;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoDetail.LastModifiedBy == UserID && MemoDetail.LastModifiedStatus == MemoDetai" +
                            "l.CurrentStatus") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 10;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "EnableAction") 
                        && (BaseRackRateView_TypedDataContext2.Validate(locations, true, 0) == true)))) {
                expressionId = 11;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "EnableAction") 
                        && (BaseRackRateView_TypedDataContext2.Validate(locations, true, 0) == true)))) {
                expressionId = 12;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "MemoDetail.CurrentStatus==\"Saved\"") 
                        && (BaseRackRateView_TypedDataContext2_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 13;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "EnableAction") 
                        && (BaseRackRateView_TypedDataContext2.Validate(locations, true, 0) == true)))) {
                expressionId = 14;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "EnableAction") 
                        && (BaseRackRateView_TypedDataContext2.Validate(locations, true, 0) == true)))) {
                expressionId = 15;
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
                return new BaseRackRateView_TypedDataContext2(locationReferences).@__Expr0GetTree();
            }
            if ((expressionId == 1)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr1GetTree();
            }
            if ((expressionId == 2)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr2GetTree();
            }
            if ((expressionId == 3)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr3GetTree();
            }
            if ((expressionId == 4)) {
                return new BaseRackRateView_TypedDataContext2(locationReferences).@__Expr4GetTree();
            }
            if ((expressionId == 5)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr5GetTree();
            }
            if ((expressionId == 6)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr6GetTree();
            }
            if ((expressionId == 7)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr7GetTree();
            }
            if ((expressionId == 8)) {
                return new BaseRackRateView_TypedDataContext2(locationReferences).@__Expr8GetTree();
            }
            if ((expressionId == 9)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr9GetTree();
            }
            if ((expressionId == 10)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr10GetTree();
            }
            if ((expressionId == 11)) {
                return new BaseRackRateView_TypedDataContext2(locationReferences).@__Expr11GetTree();
            }
            if ((expressionId == 12)) {
                return new BaseRackRateView_TypedDataContext2(locationReferences).@__Expr12GetTree();
            }
            if ((expressionId == 13)) {
                return new BaseRackRateView_TypedDataContext2_ForReadOnly(locationReferences).@__Expr13GetTree();
            }
            if ((expressionId == 14)) {
                return new BaseRackRateView_TypedDataContext2(locationReferences).@__Expr14GetTree();
            }
            if ((expressionId == 15)) {
                return new BaseRackRateView_TypedDataContext2(locationReferences).@__Expr15GetTree();
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class BaseRackRateView_TypedDataContext0 : System.Activities.XamlIntegration.CompiledDataContext {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            public BaseRackRateView_TypedDataContext0(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext0(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext0(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
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
        private class BaseRackRateView_TypedDataContext0_ForReadOnly : System.Activities.XamlIntegration.CompiledDataContext {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            public BaseRackRateView_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
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
        private class BaseRackRateView_TypedDataContext1 : BaseRackRateView_TypedDataContext0 {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected int UserID;
            
            protected int PaymentMemoID;
            
            protected bool EnableAction;
            
            protected int MemoTypeID;
            
            public BaseRackRateView_TypedDataContext1(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext1(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext1(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            protected BrokerageOnline.TransferObjects.ViewAction MemoDetail {
                get {
                    return ((BrokerageOnline.TransferObjects.ViewAction)(this.GetVariableValue((1 + locationsOffset))));
                }
                set {
                    this.SetVariableValue((1 + locationsOffset), value);
                }
            }
            
            protected BrokerageOnline.TransferObjects.WorkFlowHierarchy[] WorkFlowHierarchyList {
                get {
                    return ((BrokerageOnline.TransferObjects.WorkFlowHierarchy[])(this.GetVariableValue((5 + locationsOffset))));
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
            
            protected override void GetValueTypeValues() {
                this.UserID = ((int)(this.GetVariableValue((0 + locationsOffset))));
                this.PaymentMemoID = ((int)(this.GetVariableValue((2 + locationsOffset))));
                this.EnableAction = ((bool)(this.GetVariableValue((3 + locationsOffset))));
                this.MemoTypeID = ((int)(this.GetVariableValue((4 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            protected override void SetValueTypeValues() {
                this.SetVariableValue((0 + locationsOffset), this.UserID);
                this.SetVariableValue((2 + locationsOffset), this.PaymentMemoID);
                this.SetVariableValue((3 + locationsOffset), this.EnableAction);
                this.SetVariableValue((4 + locationsOffset), this.MemoTypeID);
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
                if (((locationReferences[(offset + 1)].Name != "MemoDetail") 
                            || (locationReferences[(offset + 1)].Type != typeof(BrokerageOnline.TransferObjects.ViewAction)))) {
                    return false;
                }
                if (((locationReferences[(offset + 5)].Name != "WorkFlowHierarchyList") 
                            || (locationReferences[(offset + 5)].Type != typeof(BrokerageOnline.TransferObjects.WorkFlowHierarchy[])))) {
                    return false;
                }
                if (((locationReferences[(offset + 0)].Name != "UserID") 
                            || (locationReferences[(offset + 0)].Type != typeof(int)))) {
                    return false;
                }
                if (((locationReferences[(offset + 2)].Name != "PaymentMemoID") 
                            || (locationReferences[(offset + 2)].Type != typeof(int)))) {
                    return false;
                }
                if (((locationReferences[(offset + 3)].Name != "EnableAction") 
                            || (locationReferences[(offset + 3)].Type != typeof(bool)))) {
                    return false;
                }
                if (((locationReferences[(offset + 4)].Name != "MemoTypeID") 
                            || (locationReferences[(offset + 4)].Type != typeof(int)))) {
                    return false;
                }
                return BaseRackRateView_TypedDataContext0.Validate(locationReferences, false, offset);
            }
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class BaseRackRateView_TypedDataContext1_ForReadOnly : BaseRackRateView_TypedDataContext0_ForReadOnly {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected int UserID;
            
            protected int PaymentMemoID;
            
            protected bool EnableAction;
            
            protected int MemoTypeID;
            
            public BaseRackRateView_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            protected BrokerageOnline.TransferObjects.ViewAction MemoDetail {
                get {
                    return ((BrokerageOnline.TransferObjects.ViewAction)(this.GetVariableValue((1 + locationsOffset))));
                }
            }
            
            protected BrokerageOnline.TransferObjects.WorkFlowHierarchy[] WorkFlowHierarchyList {
                get {
                    return ((BrokerageOnline.TransferObjects.WorkFlowHierarchy[])(this.GetVariableValue((5 + locationsOffset))));
                }
            }
            
            internal new static System.Activities.XamlIntegration.CompiledDataContext[] GetCompiledDataContextCacheHelper(object dataContextActivities, System.Activities.ActivityContext activityContext, System.Activities.Activity compiledRoot, bool forImplementation, int compiledDataContextCount) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetCompiledDataContextCache(dataContextActivities, activityContext, compiledRoot, forImplementation, compiledDataContextCount);
            }
            
            public new virtual void SetLocationsOffset(int locationsOffsetValue) {
                locationsOffset = locationsOffsetValue;
                base.SetLocationsOffset(locationsOffset);
            }
            
            protected override void GetValueTypeValues() {
                this.UserID = ((int)(this.GetVariableValue((0 + locationsOffset))));
                this.PaymentMemoID = ((int)(this.GetVariableValue((2 + locationsOffset))));
                this.EnableAction = ((bool)(this.GetVariableValue((3 + locationsOffset))));
                this.MemoTypeID = ((int)(this.GetVariableValue((4 + locationsOffset))));
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
                if (((locationReferences[(offset + 1)].Name != "MemoDetail") 
                            || (locationReferences[(offset + 1)].Type != typeof(BrokerageOnline.TransferObjects.ViewAction)))) {
                    return false;
                }
                if (((locationReferences[(offset + 5)].Name != "WorkFlowHierarchyList") 
                            || (locationReferences[(offset + 5)].Type != typeof(BrokerageOnline.TransferObjects.WorkFlowHierarchy[])))) {
                    return false;
                }
                if (((locationReferences[(offset + 0)].Name != "UserID") 
                            || (locationReferences[(offset + 0)].Type != typeof(int)))) {
                    return false;
                }
                if (((locationReferences[(offset + 2)].Name != "PaymentMemoID") 
                            || (locationReferences[(offset + 2)].Type != typeof(int)))) {
                    return false;
                }
                if (((locationReferences[(offset + 3)].Name != "EnableAction") 
                            || (locationReferences[(offset + 3)].Type != typeof(bool)))) {
                    return false;
                }
                if (((locationReferences[(offset + 4)].Name != "MemoTypeID") 
                            || (locationReferences[(offset + 4)].Type != typeof(int)))) {
                    return false;
                }
                return BaseRackRateView_TypedDataContext0_ForReadOnly.Validate(locationReferences, false, offset);
            }
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class BaseRackRateView_TypedDataContext2 : BaseRackRateView_TypedDataContext1 {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected int CurrentUserLevel;
            
            protected int ModifiedUserLevel;
            
            public BaseRackRateView_TypedDataContext2(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext2(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext2(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            internal new static System.Activities.XamlIntegration.CompiledDataContext[] GetCompiledDataContextCacheHelper(object dataContextActivities, System.Activities.ActivityContext activityContext, System.Activities.Activity compiledRoot, bool forImplementation, int compiledDataContextCount) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetCompiledDataContextCache(dataContextActivities, activityContext, compiledRoot, forImplementation, compiledDataContextCount);
            }
            
            public new virtual void SetLocationsOffset(int locationsOffsetValue) {
                locationsOffset = locationsOffsetValue;
                base.SetLocationsOffset(locationsOffset);
            }
            
            internal System.Linq.Expressions.Expression @__Expr0GetTree() {
                
                #line 70 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<BrokerageOnline.TransferObjects.WorkFlowHierarchy[]>> expression = () => 
          WorkFlowHierarchyList;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public BrokerageOnline.TransferObjects.WorkFlowHierarchy[] @__Expr0Get() {
                
                #line 70 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
          WorkFlowHierarchyList;
                
                #line default
                #line hidden
            }
            
            public BrokerageOnline.TransferObjects.WorkFlowHierarchy[] ValueType___Expr0Get() {
                this.GetValueTypeValues();
                return this.@__Expr0Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr0Set(BrokerageOnline.TransferObjects.WorkFlowHierarchy[] value) {
                
                #line 70 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                
          WorkFlowHierarchyList = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr0Set(BrokerageOnline.TransferObjects.WorkFlowHierarchy[] value) {
                this.GetValueTypeValues();
                this.@__Expr0Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr4GetTree() {
                
                #line 85 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<BrokerageOnline.TransferObjects.ViewAction>> expression = () => 
          MemoDetail;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public BrokerageOnline.TransferObjects.ViewAction @__Expr4Get() {
                
                #line 85 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
          MemoDetail;
                
                #line default
                #line hidden
            }
            
            public BrokerageOnline.TransferObjects.ViewAction ValueType___Expr4Get() {
                this.GetValueTypeValues();
                return this.@__Expr4Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr4Set(BrokerageOnline.TransferObjects.ViewAction value) {
                
                #line 85 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                
          MemoDetail = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr4Set(BrokerageOnline.TransferObjects.ViewAction value) {
                this.GetValueTypeValues();
                this.@__Expr4Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr8GetTree() {
                
                #line 110 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
              EnableAction;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr8Get() {
                
                #line 110 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
              EnableAction;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr8Get() {
                this.GetValueTypeValues();
                return this.@__Expr8Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr8Set(bool value) {
                
                #line 110 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                
              EnableAction = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr8Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr8Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr11GetTree() {
                
                #line 138 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                          EnableAction;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr11Get() {
                
                #line 138 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
                          EnableAction;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr11Get() {
                this.GetValueTypeValues();
                return this.@__Expr11Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr11Set(bool value) {
                
                #line 138 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                
                          EnableAction = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr11Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr11Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr12GetTree() {
                
                #line 150 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                          EnableAction;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr12Get() {
                
                #line 150 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
                          EnableAction;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr12Get() {
                this.GetValueTypeValues();
                return this.@__Expr12Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr12Set(bool value) {
                
                #line 150 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                
                          EnableAction = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr12Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr12Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr14GetTree() {
                
                #line 172 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                        EnableAction;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr14Get() {
                
                #line 172 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
                        EnableAction;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr14Get() {
                this.GetValueTypeValues();
                return this.@__Expr14Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr14Set(bool value) {
                
                #line 172 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                
                        EnableAction = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr14Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr14Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr15GetTree() {
                
                #line 184 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                        EnableAction;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr15Get() {
                
                #line 184 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
                        EnableAction;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr15Get() {
                this.GetValueTypeValues();
                return this.@__Expr15Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr15Set(bool value) {
                
                #line 184 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                
                        EnableAction = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr15Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr15Set(value);
                this.SetValueTypeValues();
            }
            
            protected override void GetValueTypeValues() {
                this.CurrentUserLevel = ((int)(this.GetVariableValue((6 + locationsOffset))));
                this.ModifiedUserLevel = ((int)(this.GetVariableValue((7 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            protected override void SetValueTypeValues() {
                this.SetVariableValue((6 + locationsOffset), this.CurrentUserLevel);
                this.SetVariableValue((7 + locationsOffset), this.ModifiedUserLevel);
                base.SetValueTypeValues();
            }
            
            public new static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 8))) {
                    return false;
                }
                if ((validateLocationCount == true)) {
                    offset = (locationReferences.Count - 8);
                }
                expectedLocationsCount = 8;
                if (((locationReferences[(offset + 6)].Name != "CurrentUserLevel") 
                            || (locationReferences[(offset + 6)].Type != typeof(int)))) {
                    return false;
                }
                if (((locationReferences[(offset + 7)].Name != "ModifiedUserLevel") 
                            || (locationReferences[(offset + 7)].Type != typeof(int)))) {
                    return false;
                }
                return BaseRackRateView_TypedDataContext1.Validate(locationReferences, false, offset);
            }
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class BaseRackRateView_TypedDataContext2_ForReadOnly : BaseRackRateView_TypedDataContext1_ForReadOnly {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected int CurrentUserLevel;
            
            protected int ModifiedUserLevel;
            
            public BaseRackRateView_TypedDataContext2_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext2_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public BaseRackRateView_TypedDataContext2_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            internal new static System.Activities.XamlIntegration.CompiledDataContext[] GetCompiledDataContextCacheHelper(object dataContextActivities, System.Activities.ActivityContext activityContext, System.Activities.Activity compiledRoot, bool forImplementation, int compiledDataContextCount) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetCompiledDataContextCache(dataContextActivities, activityContext, compiledRoot, forImplementation, compiledDataContextCount);
            }
            
            public new virtual void SetLocationsOffset(int locationsOffsetValue) {
                locationsOffset = locationsOffsetValue;
                base.SetLocationsOffset(locationsOffset);
            }
            
            internal System.Linq.Expressions.Expression @__Expr1GetTree() {
                
                #line 75 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<BrokerageOnline.Workflow.HelperClass.RackRate>> expression = () => 
          new HelperClass.RackRate();
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public BrokerageOnline.Workflow.HelperClass.RackRate @__Expr1Get() {
                
                #line 75 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
          new HelperClass.RackRate();
                
                #line default
                #line hidden
            }
            
            public BrokerageOnline.Workflow.HelperClass.RackRate ValueType___Expr1Get() {
                this.GetValueTypeValues();
                return this.@__Expr1Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr2GetTree() {
                
                #line 79 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<int>> expression = () => 
        MemoTypeID;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public int @__Expr2Get() {
                
                #line 79 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
        MemoTypeID;
                
                #line default
                #line hidden
            }
            
            public int ValueType___Expr2Get() {
                this.GetValueTypeValues();
                return this.@__Expr2Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr3GetTree() {
                
                #line 97 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<int>> expression = () => 
        UserID;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public int @__Expr3Get() {
                
                #line 97 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
        UserID;
                
                #line default
                #line hidden
            }
            
            public int ValueType___Expr3Get() {
                this.GetValueTypeValues();
                return this.@__Expr3Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr5GetTree() {
                
                #line 90 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<BrokerageOnline.Workflow.HelperClass.RackRate>> expression = () => 
          new HelperClass.RackRate();
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public BrokerageOnline.Workflow.HelperClass.RackRate @__Expr5Get() {
                
                #line 90 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
          new HelperClass.RackRate();
                
                #line default
                #line hidden
            }
            
            public BrokerageOnline.Workflow.HelperClass.RackRate ValueType___Expr5Get() {
                this.GetValueTypeValues();
                return this.@__Expr5Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr6GetTree() {
                
                #line 94 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<int>> expression = () => 
        PaymentMemoID;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public int @__Expr6Get() {
                
                #line 94 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
        PaymentMemoID;
                
                #line default
                #line hidden
            }
            
            public int ValueType___Expr6Get() {
                this.GetValueTypeValues();
                return this.@__Expr6Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr7GetTree() {
                
                #line 103 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
          MemoDetail.CurrentUserRole>MemoDetail.ModifiedByRole;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr7Get() {
                
                #line 103 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
          MemoDetail.CurrentUserRole>MemoDetail.ModifiedByRole;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr7Get() {
                this.GetValueTypeValues();
                return this.@__Expr7Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr9GetTree() {
                
                #line 123 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                MemoDetail.CurrentStatus=="Initiated"||MemoDetail.CurrentStatus=="Reviewed"||MemoDetail.CurrentStatus=="Approved";
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr9Get() {
                
                #line 123 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
                MemoDetail.CurrentStatus=="Initiated"||MemoDetail.CurrentStatus=="Reviewed"||MemoDetail.CurrentStatus=="Approved";
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr9Get() {
                this.GetValueTypeValues();
                return this.@__Expr9Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr10GetTree() {
                
                #line 131 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                      MemoDetail.LastModifiedBy == UserID && MemoDetail.LastModifiedStatus == MemoDetail.CurrentStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr10Get() {
                
                #line 131 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
                      MemoDetail.LastModifiedBy == UserID && MemoDetail.LastModifiedStatus == MemoDetail.CurrentStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr10Get() {
                this.GetValueTypeValues();
                return this.@__Expr10Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr13GetTree() {
                
                #line 165 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                    MemoDetail.CurrentStatus=="Saved";
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr13Get() {
                
                #line 165 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\BASERACKRATEVIEW.XAML"
                return 
                    MemoDetail.CurrentStatus=="Saved";
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr13Get() {
                this.GetValueTypeValues();
                return this.@__Expr13Get();
            }
            
            protected override void GetValueTypeValues() {
                this.CurrentUserLevel = ((int)(this.GetVariableValue((6 + locationsOffset))));
                this.ModifiedUserLevel = ((int)(this.GetVariableValue((7 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            public new static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 8))) {
                    return false;
                }
                if ((validateLocationCount == true)) {
                    offset = (locationReferences.Count - 8);
                }
                expectedLocationsCount = 8;
                if (((locationReferences[(offset + 6)].Name != "CurrentUserLevel") 
                            || (locationReferences[(offset + 6)].Type != typeof(int)))) {
                    return false;
                }
                if (((locationReferences[(offset + 7)].Name != "ModifiedUserLevel") 
                            || (locationReferences[(offset + 7)].Type != typeof(int)))) {
                    return false;
                }
                return BaseRackRateView_TypedDataContext1_ForReadOnly.Validate(locationReferences, false, offset);
            }
        }
    }
}
