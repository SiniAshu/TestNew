namespace BrokerageOnline.Workflow.Workflows.AdHoc {
    
    #line 21 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Collections;
    
    #line default
    #line hidden
    
    #line 22 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Collections.Generic;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Activities;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Activities.Expressions;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Activities.Statements;
    
    #line default
    #line hidden
    
    #line 23 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Data;
    
    #line default
    #line hidden
    
    #line 24 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Linq;
    
    #line default
    #line hidden
    
    #line 25 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Text;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\AdHoc\AdHoc.xaml"
    using System.Activities.XamlIntegration;
    
    #line default
    #line hidden
    
    
    public partial class AdHoc : System.Activities.XamlIntegration.ICompiledExpressionRoot {
        
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
                this.dataContextActivities = AdHoc_TypedDataContext1_ForReadOnly.GetDataContextActivitiesHelper(this.rootActivity, this.forImplementation);
            }
            if ((expressionId == 0)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new AdHoc_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1_ForReadOnly valDataContext0 = ((AdHoc_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext0.ValueType___Expr0Get();
            }
            if ((expressionId == 1)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new AdHoc_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1_ForReadOnly valDataContext1 = ((AdHoc_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext1.ValueType___Expr1Get();
            }
            if ((expressionId == 2)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext2 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext2.GetLocation<bool>(refDataContext2.ValueType___Expr2Get, refDataContext2.ValueType___Expr2Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 3)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext3 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext3.GetLocation<bool>(refDataContext3.ValueType___Expr3Get, refDataContext3.ValueType___Expr3Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 4)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new AdHoc_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1_ForReadOnly valDataContext4 = ((AdHoc_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext4.ValueType___Expr4Get();
            }
            if ((expressionId == 5)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext5 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext5.GetLocation<bool>(refDataContext5.ValueType___Expr5Get, refDataContext5.ValueType___Expr5Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 6)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext6 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext6.GetLocation<bool>(refDataContext6.ValueType___Expr6Get, refDataContext6.ValueType___Expr6Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 7)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new AdHoc_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1_ForReadOnly valDataContext7 = ((AdHoc_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext7.ValueType___Expr7Get();
            }
            if ((expressionId == 8)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext8 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext8.GetLocation<bool>(refDataContext8.ValueType___Expr8Get, refDataContext8.ValueType___Expr8Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 9)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext9 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext9.GetLocation<bool>(refDataContext9.ValueType___Expr9Get, refDataContext9.ValueType___Expr9Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 10)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new AdHoc_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1_ForReadOnly valDataContext10 = ((AdHoc_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext10.ValueType___Expr10Get();
            }
            if ((expressionId == 11)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext11 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext11.GetLocation<bool>(refDataContext11.ValueType___Expr11Get, refDataContext11.ValueType___Expr11Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 12)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext12 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext12.GetLocation<bool>(refDataContext12.ValueType___Expr12Get, refDataContext12.ValueType___Expr12Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 13)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new AdHoc_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1_ForReadOnly valDataContext13 = ((AdHoc_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext13.ValueType___Expr13Get();
            }
            if ((expressionId == 14)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext14 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext14.GetLocation<bool>(refDataContext14.ValueType___Expr14Get, refDataContext14.ValueType___Expr14Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 15)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext15 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext15.GetLocation<bool>(refDataContext15.ValueType___Expr15Get, refDataContext15.ValueType___Expr15Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 16)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new AdHoc_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1_ForReadOnly valDataContext16 = ((AdHoc_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext16.ValueType___Expr16Get();
            }
            if ((expressionId == 17)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext17 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext17.GetLocation<bool>(refDataContext17.ValueType___Expr17Get, refDataContext17.ValueType___Expr17Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 18)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext18 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext18.GetLocation<bool>(refDataContext18.ValueType___Expr18Get, refDataContext18.ValueType___Expr18Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 19)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new AdHoc_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1_ForReadOnly valDataContext19 = ((AdHoc_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext19.ValueType___Expr19Get();
            }
            if ((expressionId == 20)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext20 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext20.GetLocation<bool>(refDataContext20.ValueType___Expr20Get, refDataContext20.ValueType___Expr20Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 21)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext21 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext21.GetLocation<bool>(refDataContext21.ValueType___Expr21Get, refDataContext21.ValueType___Expr21Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 22)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = AdHoc_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new AdHoc_TypedDataContext1(locations, activityContext, true);
                }
                AdHoc_TypedDataContext1 refDataContext22 = ((AdHoc_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext22.GetLocation<bool>(refDataContext22.ValueType___Expr22Get, refDataContext22.ValueType___Expr22Set, expressionId, this.rootActivity, activityContext);
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
                AdHoc_TypedDataContext1_ForReadOnly valDataContext0 = new AdHoc_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext0.ValueType___Expr0Get();
            }
            if ((expressionId == 1)) {
                AdHoc_TypedDataContext1_ForReadOnly valDataContext1 = new AdHoc_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext1.ValueType___Expr1Get();
            }
            if ((expressionId == 2)) {
                AdHoc_TypedDataContext1 refDataContext2 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext2.GetLocation<bool>(refDataContext2.ValueType___Expr2Get, refDataContext2.ValueType___Expr2Set);
            }
            if ((expressionId == 3)) {
                AdHoc_TypedDataContext1 refDataContext3 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext3.GetLocation<bool>(refDataContext3.ValueType___Expr3Get, refDataContext3.ValueType___Expr3Set);
            }
            if ((expressionId == 4)) {
                AdHoc_TypedDataContext1_ForReadOnly valDataContext4 = new AdHoc_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext4.ValueType___Expr4Get();
            }
            if ((expressionId == 5)) {
                AdHoc_TypedDataContext1 refDataContext5 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext5.GetLocation<bool>(refDataContext5.ValueType___Expr5Get, refDataContext5.ValueType___Expr5Set);
            }
            if ((expressionId == 6)) {
                AdHoc_TypedDataContext1 refDataContext6 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext6.GetLocation<bool>(refDataContext6.ValueType___Expr6Get, refDataContext6.ValueType___Expr6Set);
            }
            if ((expressionId == 7)) {
                AdHoc_TypedDataContext1_ForReadOnly valDataContext7 = new AdHoc_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext7.ValueType___Expr7Get();
            }
            if ((expressionId == 8)) {
                AdHoc_TypedDataContext1 refDataContext8 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext8.GetLocation<bool>(refDataContext8.ValueType___Expr8Get, refDataContext8.ValueType___Expr8Set);
            }
            if ((expressionId == 9)) {
                AdHoc_TypedDataContext1 refDataContext9 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext9.GetLocation<bool>(refDataContext9.ValueType___Expr9Get, refDataContext9.ValueType___Expr9Set);
            }
            if ((expressionId == 10)) {
                AdHoc_TypedDataContext1_ForReadOnly valDataContext10 = new AdHoc_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext10.ValueType___Expr10Get();
            }
            if ((expressionId == 11)) {
                AdHoc_TypedDataContext1 refDataContext11 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext11.GetLocation<bool>(refDataContext11.ValueType___Expr11Get, refDataContext11.ValueType___Expr11Set);
            }
            if ((expressionId == 12)) {
                AdHoc_TypedDataContext1 refDataContext12 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext12.GetLocation<bool>(refDataContext12.ValueType___Expr12Get, refDataContext12.ValueType___Expr12Set);
            }
            if ((expressionId == 13)) {
                AdHoc_TypedDataContext1_ForReadOnly valDataContext13 = new AdHoc_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext13.ValueType___Expr13Get();
            }
            if ((expressionId == 14)) {
                AdHoc_TypedDataContext1 refDataContext14 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext14.GetLocation<bool>(refDataContext14.ValueType___Expr14Get, refDataContext14.ValueType___Expr14Set);
            }
            if ((expressionId == 15)) {
                AdHoc_TypedDataContext1 refDataContext15 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext15.GetLocation<bool>(refDataContext15.ValueType___Expr15Get, refDataContext15.ValueType___Expr15Set);
            }
            if ((expressionId == 16)) {
                AdHoc_TypedDataContext1_ForReadOnly valDataContext16 = new AdHoc_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext16.ValueType___Expr16Get();
            }
            if ((expressionId == 17)) {
                AdHoc_TypedDataContext1 refDataContext17 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext17.GetLocation<bool>(refDataContext17.ValueType___Expr17Get, refDataContext17.ValueType___Expr17Set);
            }
            if ((expressionId == 18)) {
                AdHoc_TypedDataContext1 refDataContext18 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext18.GetLocation<bool>(refDataContext18.ValueType___Expr18Get, refDataContext18.ValueType___Expr18Set);
            }
            if ((expressionId == 19)) {
                AdHoc_TypedDataContext1_ForReadOnly valDataContext19 = new AdHoc_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext19.ValueType___Expr19Get();
            }
            if ((expressionId == 20)) {
                AdHoc_TypedDataContext1 refDataContext20 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext20.GetLocation<bool>(refDataContext20.ValueType___Expr20Get, refDataContext20.ValueType___Expr20Set);
            }
            if ((expressionId == 21)) {
                AdHoc_TypedDataContext1 refDataContext21 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext21.GetLocation<bool>(refDataContext21.ValueType___Expr21Get, refDataContext21.ValueType___Expr21Set);
            }
            if ((expressionId == 22)) {
                AdHoc_TypedDataContext1 refDataContext22 = new AdHoc_TypedDataContext1(locations, true);
                return refDataContext22.GetLocation<bool>(refDataContext22.ValueType___Expr22Get, refDataContext22.ValueType___Expr22Set);
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public bool CanExecuteExpression(string expressionText, bool isReference, System.Collections.Generic.IList<System.Activities.LocationReference> locations, out int expressionId) {
            if (((isReference == false) 
                        && ((expressionText == "NavigateKey") 
                        && (AdHoc_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 0;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "RoleID > 7") 
                        && (AdHoc_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 1;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 2;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 3;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "RoleID > 4") 
                        && (AdHoc_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 4;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 5;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 6;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "RoleID != 4 && RoleID != 5 && RoleID >=3") 
                        && (AdHoc_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 7;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 8;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 9;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "RoleID == 10") 
                        && (AdHoc_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 10;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 11;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 12;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "RoleID >= 6") 
                        && (AdHoc_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 13;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 14;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 15;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "RoleID == 10") 
                        && (AdHoc_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 16;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 17;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 18;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "RoleID == 4") 
                        && (AdHoc_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 19;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 20;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 21;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "OutputStatus") 
                        && (AdHoc_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 22;
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
                return new AdHoc_TypedDataContext1_ForReadOnly(locationReferences).@__Expr0GetTree();
            }
            if ((expressionId == 1)) {
                return new AdHoc_TypedDataContext1_ForReadOnly(locationReferences).@__Expr1GetTree();
            }
            if ((expressionId == 2)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr2GetTree();
            }
            if ((expressionId == 3)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr3GetTree();
            }
            if ((expressionId == 4)) {
                return new AdHoc_TypedDataContext1_ForReadOnly(locationReferences).@__Expr4GetTree();
            }
            if ((expressionId == 5)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr5GetTree();
            }
            if ((expressionId == 6)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr6GetTree();
            }
            if ((expressionId == 7)) {
                return new AdHoc_TypedDataContext1_ForReadOnly(locationReferences).@__Expr7GetTree();
            }
            if ((expressionId == 8)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr8GetTree();
            }
            if ((expressionId == 9)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr9GetTree();
            }
            if ((expressionId == 10)) {
                return new AdHoc_TypedDataContext1_ForReadOnly(locationReferences).@__Expr10GetTree();
            }
            if ((expressionId == 11)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr11GetTree();
            }
            if ((expressionId == 12)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr12GetTree();
            }
            if ((expressionId == 13)) {
                return new AdHoc_TypedDataContext1_ForReadOnly(locationReferences).@__Expr13GetTree();
            }
            if ((expressionId == 14)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr14GetTree();
            }
            if ((expressionId == 15)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr15GetTree();
            }
            if ((expressionId == 16)) {
                return new AdHoc_TypedDataContext1_ForReadOnly(locationReferences).@__Expr16GetTree();
            }
            if ((expressionId == 17)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr17GetTree();
            }
            if ((expressionId == 18)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr18GetTree();
            }
            if ((expressionId == 19)) {
                return new AdHoc_TypedDataContext1_ForReadOnly(locationReferences).@__Expr19GetTree();
            }
            if ((expressionId == 20)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr20GetTree();
            }
            if ((expressionId == 21)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr21GetTree();
            }
            if ((expressionId == 22)) {
                return new AdHoc_TypedDataContext1(locationReferences).@__Expr22GetTree();
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class AdHoc_TypedDataContext0 : System.Activities.XamlIntegration.CompiledDataContext {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            public AdHoc_TypedDataContext0(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public AdHoc_TypedDataContext0(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public AdHoc_TypedDataContext0(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
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
        private class AdHoc_TypedDataContext0_ForReadOnly : System.Activities.XamlIntegration.CompiledDataContext {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            public AdHoc_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public AdHoc_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public AdHoc_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
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
        private class AdHoc_TypedDataContext1 : AdHoc_TypedDataContext0 {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected bool OutputStatus;
            
            protected int RoleID;
            
            public AdHoc_TypedDataContext1(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public AdHoc_TypedDataContext1(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public AdHoc_TypedDataContext1(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            protected string NavigateKey {
                get {
                    return ((string)(this.GetVariableValue((2 + locationsOffset))));
                }
                set {
                    this.SetVariableValue((2 + locationsOffset), value);
                }
            }
            
            internal new static System.Activities.XamlIntegration.CompiledDataContext[] GetCompiledDataContextCacheHelper(object dataContextActivities, System.Activities.ActivityContext activityContext, System.Activities.Activity compiledRoot, bool forImplementation, int compiledDataContextCount) {
                return System.Activities.XamlIntegration.CompiledDataContext.GetCompiledDataContextCache(dataContextActivities, activityContext, compiledRoot, forImplementation, compiledDataContextCount);
            }
            
            public new virtual void SetLocationsOffset(int locationsOffsetValue) {
                locationsOffset = locationsOffsetValue;
                base.SetLocationsOffset(locationsOffset);
            }
            
            internal System.Linq.Expressions.Expression @__Expr2GetTree() {
                
                #line 85 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr2Get() {
                
                #line 85 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr2Get() {
                this.GetValueTypeValues();
                return this.@__Expr2Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr2Set(bool value) {
                
                #line 85 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr2Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr2Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr3GetTree() {
                
                #line 97 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr3Get() {
                
                #line 97 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr3Get() {
                this.GetValueTypeValues();
                return this.@__Expr3Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr3Set(bool value) {
                
                #line 97 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr3Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr3Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr5GetTree() {
                
                #line 116 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr5Get() {
                
                #line 116 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr5Get() {
                this.GetValueTypeValues();
                return this.@__Expr5Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr5Set(bool value) {
                
                #line 116 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr5Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr5Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr6GetTree() {
                
                #line 128 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr6Get() {
                
                #line 128 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr6Get() {
                this.GetValueTypeValues();
                return this.@__Expr6Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr6Set(bool value) {
                
                #line 128 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr6Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr6Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr8GetTree() {
                
                #line 147 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr8Get() {
                
                #line 147 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr8Get() {
                this.GetValueTypeValues();
                return this.@__Expr8Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr8Set(bool value) {
                
                #line 147 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr8Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr8Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr9GetTree() {
                
                #line 159 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr9Get() {
                
                #line 159 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr9Get() {
                this.GetValueTypeValues();
                return this.@__Expr9Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr9Set(bool value) {
                
                #line 159 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr9Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr9Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr11GetTree() {
                
                #line 178 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr11Get() {
                
                #line 178 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr11Get() {
                this.GetValueTypeValues();
                return this.@__Expr11Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr11Set(bool value) {
                
                #line 178 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr11Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr11Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr12GetTree() {
                
                #line 190 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr12Get() {
                
                #line 190 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr12Get() {
                this.GetValueTypeValues();
                return this.@__Expr12Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr12Set(bool value) {
                
                #line 190 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr12Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr12Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr14GetTree() {
                
                #line 209 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr14Get() {
                
                #line 209 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr14Get() {
                this.GetValueTypeValues();
                return this.@__Expr14Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr14Set(bool value) {
                
                #line 209 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr14Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr14Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr15GetTree() {
                
                #line 221 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr15Get() {
                
                #line 221 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr15Get() {
                this.GetValueTypeValues();
                return this.@__Expr15Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr15Set(bool value) {
                
                #line 221 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr15Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr15Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr17GetTree() {
                
                #line 240 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr17Get() {
                
                #line 240 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr17Get() {
                this.GetValueTypeValues();
                return this.@__Expr17Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr17Set(bool value) {
                
                #line 240 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr17Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr17Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr18GetTree() {
                
                #line 252 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr18Get() {
                
                #line 252 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr18Get() {
                this.GetValueTypeValues();
                return this.@__Expr18Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr18Set(bool value) {
                
                #line 252 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr18Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr18Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr20GetTree() {
                
                #line 271 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr20Get() {
                
                #line 271 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr20Get() {
                this.GetValueTypeValues();
                return this.@__Expr20Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr20Set(bool value) {
                
                #line 271 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr20Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr20Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr21GetTree() {
                
                #line 283 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
                OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr21Get() {
                
                #line 283 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
                OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr21Get() {
                this.GetValueTypeValues();
                return this.@__Expr21Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr21Set(bool value) {
                
                #line 283 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
                OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr21Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr21Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr22GetTree() {
                
                #line 62 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
              OutputStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr22Get() {
                
                #line 62 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
              OutputStatus;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr22Get() {
                this.GetValueTypeValues();
                return this.@__Expr22Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr22Set(bool value) {
                
                #line 62 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                
              OutputStatus = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr22Set(bool value) {
                this.GetValueTypeValues();
                this.@__Expr22Set(value);
                this.SetValueTypeValues();
            }
            
            protected override void GetValueTypeValues() {
                this.OutputStatus = ((bool)(this.GetVariableValue((0 + locationsOffset))));
                this.RoleID = ((int)(this.GetVariableValue((1 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            protected override void SetValueTypeValues() {
                this.SetVariableValue((0 + locationsOffset), this.OutputStatus);
                this.SetVariableValue((1 + locationsOffset), this.RoleID);
                base.SetValueTypeValues();
            }
            
            public new static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 3))) {
                    return false;
                }
                if ((validateLocationCount == true)) {
                    offset = (locationReferences.Count - 3);
                }
                expectedLocationsCount = 3;
                if (((locationReferences[(offset + 2)].Name != "NavigateKey") 
                            || (locationReferences[(offset + 2)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 0)].Name != "OutputStatus") 
                            || (locationReferences[(offset + 0)].Type != typeof(bool)))) {
                    return false;
                }
                if (((locationReferences[(offset + 1)].Name != "RoleID") 
                            || (locationReferences[(offset + 1)].Type != typeof(int)))) {
                    return false;
                }
                return AdHoc_TypedDataContext0.Validate(locationReferences, false, offset);
            }
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class AdHoc_TypedDataContext1_ForReadOnly : AdHoc_TypedDataContext0_ForReadOnly {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected bool OutputStatus;
            
            protected int RoleID;
            
            public AdHoc_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public AdHoc_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public AdHoc_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            protected string NavigateKey {
                get {
                    return ((string)(this.GetVariableValue((2 + locationsOffset))));
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
                
                #line 72 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<string>> expression = () => 
          NavigateKey;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public string @__Expr0Get() {
                
                #line 72 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
          NavigateKey;
                
                #line default
                #line hidden
            }
            
            public string ValueType___Expr0Get() {
                this.GetValueTypeValues();
                return this.@__Expr0Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr1GetTree() {
                
                #line 78 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
            RoleID > 7;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr1Get() {
                
                #line 78 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
            RoleID > 7;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr1Get() {
                this.GetValueTypeValues();
                return this.@__Expr1Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr4GetTree() {
                
                #line 109 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
            RoleID > 4;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr4Get() {
                
                #line 109 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
            RoleID > 4;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr4Get() {
                this.GetValueTypeValues();
                return this.@__Expr4Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr7GetTree() {
                
                #line 140 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
            RoleID != 4 && RoleID != 5 && RoleID >=3;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr7Get() {
                
                #line 140 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
            RoleID != 4 && RoleID != 5 && RoleID >=3;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr7Get() {
                this.GetValueTypeValues();
                return this.@__Expr7Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr10GetTree() {
                
                #line 171 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
            RoleID == 10;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr10Get() {
                
                #line 171 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
            RoleID == 10;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr10Get() {
                this.GetValueTypeValues();
                return this.@__Expr10Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr13GetTree() {
                
                #line 202 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
            RoleID >= 6;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr13Get() {
                
                #line 202 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
            RoleID >= 6;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr13Get() {
                this.GetValueTypeValues();
                return this.@__Expr13Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr16GetTree() {
                
                #line 233 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
            RoleID == 10;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr16Get() {
                
                #line 233 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
            RoleID == 10;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr16Get() {
                this.GetValueTypeValues();
                return this.@__Expr16Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr19GetTree() {
                
                #line 264 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                System.Linq.Expressions.Expression<System.Func<bool>> expression = () => 
            RoleID == 4;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public bool @__Expr19Get() {
                
                #line 264 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\ADHOC\ADHOC.XAML"
                return 
            RoleID == 4;
                
                #line default
                #line hidden
            }
            
            public bool ValueType___Expr19Get() {
                this.GetValueTypeValues();
                return this.@__Expr19Get();
            }
            
            protected override void GetValueTypeValues() {
                this.OutputStatus = ((bool)(this.GetVariableValue((0 + locationsOffset))));
                this.RoleID = ((int)(this.GetVariableValue((1 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            public new static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 3))) {
                    return false;
                }
                if ((validateLocationCount == true)) {
                    offset = (locationReferences.Count - 3);
                }
                expectedLocationsCount = 3;
                if (((locationReferences[(offset + 2)].Name != "NavigateKey") 
                            || (locationReferences[(offset + 2)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 0)].Name != "OutputStatus") 
                            || (locationReferences[(offset + 0)].Type != typeof(bool)))) {
                    return false;
                }
                if (((locationReferences[(offset + 1)].Name != "RoleID") 
                            || (locationReferences[(offset + 1)].Type != typeof(int)))) {
                    return false;
                }
                return AdHoc_TypedDataContext0_ForReadOnly.Validate(locationReferences, false, offset);
            }
        }
    }
}
