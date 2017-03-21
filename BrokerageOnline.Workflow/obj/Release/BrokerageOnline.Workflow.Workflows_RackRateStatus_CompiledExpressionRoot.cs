namespace BrokerageOnline.Workflow.Workflows {
    
    #line 27 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Collections;
    
    #line default
    #line hidden
    
    #line 28 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Collections.Generic;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Activities;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Activities.Expressions;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Activities.Statements;
    
    #line default
    #line hidden
    
    #line 29 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Data;
    
    #line default
    #line hidden
    
    #line 30 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Linq;
    
    #line default
    #line hidden
    
    #line 31 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Text;
    
    #line default
    #line hidden
    
    #line 32 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using BrokerageOnline.TransferObjects;
    
    #line default
    #line hidden
    
    #line 1 "E:\DSP\Prod Copy\BrokerageOnline.Workflow\Workflows\RackRateStatus.xaml"
    using System.Activities.XamlIntegration;
    
    #line default
    #line hidden
    
    
    public partial class RackRateStatus : System.Activities.XamlIntegration.ICompiledExpressionRoot {
        
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
                this.dataContextActivities = RackRateStatus_TypedDataContext1_ForReadOnly.GetDataContextActivitiesHelper(this.rootActivity, this.forImplementation);
            }
            if ((expressionId == 0)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateStatus_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateStatus_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateStatus_TypedDataContext1_ForReadOnly valDataContext0 = ((RackRateStatus_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext0.ValueType___Expr0Get();
            }
            if ((expressionId == 1)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateStatus_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateStatus_TypedDataContext1(locations, activityContext, true);
                }
                RackRateStatus_TypedDataContext1 refDataContext1 = ((RackRateStatus_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext1.GetLocation<BrokerageOnline.TransferObjects.ViewAction>(refDataContext1.ValueType___Expr1Get, refDataContext1.ValueType___Expr1Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 2)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateStatus_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateStatus_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateStatus_TypedDataContext1_ForReadOnly valDataContext2 = ((RackRateStatus_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext2.ValueType___Expr2Get();
            }
            if ((expressionId == 3)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateStatus_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateStatus_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateStatus_TypedDataContext1_ForReadOnly valDataContext3 = ((RackRateStatus_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext3.ValueType___Expr3Get();
            }
            if ((expressionId == 4)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateStatus_TypedDataContext1_ForReadOnly.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[0] == null)) {
                    cachedCompiledDataContext[0] = new RackRateStatus_TypedDataContext1_ForReadOnly(locations, activityContext, true);
                }
                RackRateStatus_TypedDataContext1_ForReadOnly valDataContext4 = ((RackRateStatus_TypedDataContext1_ForReadOnly)(cachedCompiledDataContext[0]));
                return valDataContext4.ValueType___Expr4Get();
            }
            if ((expressionId == 5)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateStatus_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateStatus_TypedDataContext1(locations, activityContext, true);
                }
                RackRateStatus_TypedDataContext1 refDataContext5 = ((RackRateStatus_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext5.GetLocation<string>(refDataContext5.ValueType___Expr5Get, refDataContext5.ValueType___Expr5Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 6)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateStatus_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateStatus_TypedDataContext1(locations, activityContext, true);
                }
                RackRateStatus_TypedDataContext1 refDataContext6 = ((RackRateStatus_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext6.GetLocation<string>(refDataContext6.ValueType___Expr6Get, refDataContext6.ValueType___Expr6Set, expressionId, this.rootActivity, activityContext);
            }
            if ((expressionId == 7)) {
                System.Activities.XamlIntegration.CompiledDataContext[] cachedCompiledDataContext = RackRateStatus_TypedDataContext1.GetCompiledDataContextCacheHelper(this.dataContextActivities, activityContext, this.rootActivity, this.forImplementation, 2);
                if ((cachedCompiledDataContext[1] == null)) {
                    cachedCompiledDataContext[1] = new RackRateStatus_TypedDataContext1(locations, activityContext, true);
                }
                RackRateStatus_TypedDataContext1 refDataContext7 = ((RackRateStatus_TypedDataContext1)(cachedCompiledDataContext[1]));
                return refDataContext7.GetLocation<string>(refDataContext7.ValueType___Expr7Get, refDataContext7.ValueType___Expr7Set, expressionId, this.rootActivity, activityContext);
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
                RackRateStatus_TypedDataContext1_ForReadOnly valDataContext0 = new RackRateStatus_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext0.ValueType___Expr0Get();
            }
            if ((expressionId == 1)) {
                RackRateStatus_TypedDataContext1 refDataContext1 = new RackRateStatus_TypedDataContext1(locations, true);
                return refDataContext1.GetLocation<BrokerageOnline.TransferObjects.ViewAction>(refDataContext1.ValueType___Expr1Get, refDataContext1.ValueType___Expr1Set);
            }
            if ((expressionId == 2)) {
                RackRateStatus_TypedDataContext1_ForReadOnly valDataContext2 = new RackRateStatus_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext2.ValueType___Expr2Get();
            }
            if ((expressionId == 3)) {
                RackRateStatus_TypedDataContext1_ForReadOnly valDataContext3 = new RackRateStatus_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext3.ValueType___Expr3Get();
            }
            if ((expressionId == 4)) {
                RackRateStatus_TypedDataContext1_ForReadOnly valDataContext4 = new RackRateStatus_TypedDataContext1_ForReadOnly(locations, true);
                return valDataContext4.ValueType___Expr4Get();
            }
            if ((expressionId == 5)) {
                RackRateStatus_TypedDataContext1 refDataContext5 = new RackRateStatus_TypedDataContext1(locations, true);
                return refDataContext5.GetLocation<string>(refDataContext5.ValueType___Expr5Get, refDataContext5.ValueType___Expr5Set);
            }
            if ((expressionId == 6)) {
                RackRateStatus_TypedDataContext1 refDataContext6 = new RackRateStatus_TypedDataContext1(locations, true);
                return refDataContext6.GetLocation<string>(refDataContext6.ValueType___Expr6Get, refDataContext6.ValueType___Expr6Set);
            }
            if ((expressionId == 7)) {
                RackRateStatus_TypedDataContext1 refDataContext7 = new RackRateStatus_TypedDataContext1(locations, true);
                return refDataContext7.GetLocation<string>(refDataContext7.ValueType___Expr7Get, refDataContext7.ValueType___Expr7Set);
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        public bool CanExecuteExpression(string expressionText, bool isReference, System.Collections.Generic.IList<System.Activities.LocationReference> locations, out int expressionId) {
            if (((isReference == false) 
                        && ((expressionText == "UserID") 
                        && (RackRateStatus_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 0;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "MemoDetail") 
                        && (RackRateStatus_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 1;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "new HelperClass.RackRate()") 
                        && (RackRateStatus_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 2;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "PaymentMemoID") 
                        && (RackRateStatus_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 3;
                return true;
            }
            if (((isReference == false) 
                        && ((expressionText == "IncomingStatus") 
                        && (RackRateStatus_TypedDataContext1_ForReadOnly.Validate(locations, true, 0) == true)))) {
                expressionId = 4;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Status") 
                        && (RackRateStatus_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 5;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Status") 
                        && (RackRateStatus_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 6;
                return true;
            }
            if (((isReference == true) 
                        && ((expressionText == "Status") 
                        && (RackRateStatus_TypedDataContext1.Validate(locations, true, 0) == true)))) {
                expressionId = 7;
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
                return new RackRateStatus_TypedDataContext1_ForReadOnly(locationReferences).@__Expr0GetTree();
            }
            if ((expressionId == 1)) {
                return new RackRateStatus_TypedDataContext1(locationReferences).@__Expr1GetTree();
            }
            if ((expressionId == 2)) {
                return new RackRateStatus_TypedDataContext1_ForReadOnly(locationReferences).@__Expr2GetTree();
            }
            if ((expressionId == 3)) {
                return new RackRateStatus_TypedDataContext1_ForReadOnly(locationReferences).@__Expr3GetTree();
            }
            if ((expressionId == 4)) {
                return new RackRateStatus_TypedDataContext1_ForReadOnly(locationReferences).@__Expr4GetTree();
            }
            if ((expressionId == 5)) {
                return new RackRateStatus_TypedDataContext1(locationReferences).@__Expr5GetTree();
            }
            if ((expressionId == 6)) {
                return new RackRateStatus_TypedDataContext1(locationReferences).@__Expr6GetTree();
            }
            if ((expressionId == 7)) {
                return new RackRateStatus_TypedDataContext1(locationReferences).@__Expr7GetTree();
            }
            return null;
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class RackRateStatus_TypedDataContext0 : System.Activities.XamlIntegration.CompiledDataContext {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            public RackRateStatus_TypedDataContext0(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateStatus_TypedDataContext0(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateStatus_TypedDataContext0(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
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
        private class RackRateStatus_TypedDataContext0_ForReadOnly : System.Activities.XamlIntegration.CompiledDataContext {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            public RackRateStatus_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateStatus_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateStatus_TypedDataContext0_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
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
        private class RackRateStatus_TypedDataContext1 : RackRateStatus_TypedDataContext0 {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected int UserID;
            
            protected int PaymentMemoID;
            
            protected int MemoTypeID;
            
            public RackRateStatus_TypedDataContext1(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateStatus_TypedDataContext1(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateStatus_TypedDataContext1(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            protected string IncomingStatus {
                get {
                    return ((string)(this.GetVariableValue((0 + locationsOffset))));
                }
                set {
                    this.SetVariableValue((0 + locationsOffset), value);
                }
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
            
            protected BrokerageOnline.TransferObjects.WorkFlowHierarchy WorkFlowHierarchyList {
                get {
                    return ((BrokerageOnline.TransferObjects.WorkFlowHierarchy)(this.GetVariableValue((6 + locationsOffset))));
                }
                set {
                    this.SetVariableValue((6 + locationsOffset), value);
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
                
                #line 67 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                System.Linq.Expressions.Expression<System.Func<BrokerageOnline.TransferObjects.ViewAction>> expression = () => 
          MemoDetail;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public BrokerageOnline.TransferObjects.ViewAction @__Expr1Get() {
                
                #line 67 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                return 
          MemoDetail;
                
                #line default
                #line hidden
            }
            
            public BrokerageOnline.TransferObjects.ViewAction ValueType___Expr1Get() {
                this.GetValueTypeValues();
                return this.@__Expr1Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr1Set(BrokerageOnline.TransferObjects.ViewAction value) {
                
                #line 67 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                
          MemoDetail = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr1Set(BrokerageOnline.TransferObjects.ViewAction value) {
                this.GetValueTypeValues();
                this.@__Expr1Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr5GetTree() {
                
                #line 91 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                System.Linq.Expressions.Expression<System.Func<string>> expression = () => 
            Status;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public string @__Expr5Get() {
                
                #line 91 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                return 
            Status;
                
                #line default
                #line hidden
            }
            
            public string ValueType___Expr5Get() {
                this.GetValueTypeValues();
                return this.@__Expr5Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr5Set(string value) {
                
                #line 91 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                
            Status = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr5Set(string value) {
                this.GetValueTypeValues();
                this.@__Expr5Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr6GetTree() {
                
                #line 101 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                System.Linq.Expressions.Expression<System.Func<string>> expression = () => 
            Status;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public string @__Expr6Get() {
                
                #line 101 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                return 
            Status;
                
                #line default
                #line hidden
            }
            
            public string ValueType___Expr6Get() {
                this.GetValueTypeValues();
                return this.@__Expr6Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr6Set(string value) {
                
                #line 101 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                
            Status = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr6Set(string value) {
                this.GetValueTypeValues();
                this.@__Expr6Set(value);
                this.SetValueTypeValues();
            }
            
            internal System.Linq.Expressions.Expression @__Expr7GetTree() {
                
                #line 111 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                System.Linq.Expressions.Expression<System.Func<string>> expression = () => 
            Status;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public string @__Expr7Get() {
                
                #line 111 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                return 
            Status;
                
                #line default
                #line hidden
            }
            
            public string ValueType___Expr7Get() {
                this.GetValueTypeValues();
                return this.@__Expr7Get();
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public void @__Expr7Set(string value) {
                
                #line 111 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                
            Status = value;
                
                #line default
                #line hidden
            }
            
            public void ValueType___Expr7Set(string value) {
                this.GetValueTypeValues();
                this.@__Expr7Set(value);
                this.SetValueTypeValues();
            }
            
            protected override void GetValueTypeValues() {
                this.UserID = ((int)(this.GetVariableValue((1 + locationsOffset))));
                this.PaymentMemoID = ((int)(this.GetVariableValue((4 + locationsOffset))));
                this.MemoTypeID = ((int)(this.GetVariableValue((5 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            protected override void SetValueTypeValues() {
                this.SetVariableValue((1 + locationsOffset), this.UserID);
                this.SetVariableValue((4 + locationsOffset), this.PaymentMemoID);
                this.SetVariableValue((5 + locationsOffset), this.MemoTypeID);
                base.SetValueTypeValues();
            }
            
            public new static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 7))) {
                    return false;
                }
                if ((validateLocationCount == true)) {
                    offset = (locationReferences.Count - 7);
                }
                expectedLocationsCount = 7;
                if (((locationReferences[(offset + 0)].Name != "IncomingStatus") 
                            || (locationReferences[(offset + 0)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 2)].Name != "MemoDetail") 
                            || (locationReferences[(offset + 2)].Type != typeof(BrokerageOnline.TransferObjects.ViewAction)))) {
                    return false;
                }
                if (((locationReferences[(offset + 3)].Name != "Status") 
                            || (locationReferences[(offset + 3)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 6)].Name != "WorkFlowHierarchyList") 
                            || (locationReferences[(offset + 6)].Type != typeof(BrokerageOnline.TransferObjects.WorkFlowHierarchy)))) {
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
                if (((locationReferences[(offset + 5)].Name != "MemoTypeID") 
                            || (locationReferences[(offset + 5)].Type != typeof(int)))) {
                    return false;
                }
                return RackRateStatus_TypedDataContext0.Validate(locationReferences, false, offset);
            }
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Activities", "4.0.0.0")]
        [System.ComponentModel.BrowsableAttribute(false)]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        private class RackRateStatus_TypedDataContext1_ForReadOnly : RackRateStatus_TypedDataContext0_ForReadOnly {
            
            private int locationsOffset;
            
            private static int expectedLocationsCount;
            
            protected int UserID;
            
            protected int PaymentMemoID;
            
            protected int MemoTypeID;
            
            public RackRateStatus_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locations, System.Activities.ActivityContext activityContext, bool computelocationsOffset) : 
                    base(locations, activityContext, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateStatus_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.Location> locations, bool computelocationsOffset) : 
                    base(locations, false) {
                if ((computelocationsOffset == true)) {
                    this.SetLocationsOffset((locations.Count - expectedLocationsCount));
                }
            }
            
            public RackRateStatus_TypedDataContext1_ForReadOnly(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences) : 
                    base(locationReferences) {
            }
            
            protected string IncomingStatus {
                get {
                    return ((string)(this.GetVariableValue((0 + locationsOffset))));
                }
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
            
            protected BrokerageOnline.TransferObjects.WorkFlowHierarchy WorkFlowHierarchyList {
                get {
                    return ((BrokerageOnline.TransferObjects.WorkFlowHierarchy)(this.GetVariableValue((6 + locationsOffset))));
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
                
                #line 79 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                System.Linq.Expressions.Expression<System.Func<int>> expression = () => 
        UserID;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public int @__Expr0Get() {
                
                #line 79 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                return 
        UserID;
                
                #line default
                #line hidden
            }
            
            public int ValueType___Expr0Get() {
                this.GetValueTypeValues();
                return this.@__Expr0Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr2GetTree() {
                
                #line 72 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                System.Linq.Expressions.Expression<System.Func<BrokerageOnline.Workflow.HelperClass.RackRate>> expression = () => 
          new HelperClass.RackRate();
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public BrokerageOnline.Workflow.HelperClass.RackRate @__Expr2Get() {
                
                #line 72 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                return 
          new HelperClass.RackRate();
                
                #line default
                #line hidden
            }
            
            public BrokerageOnline.Workflow.HelperClass.RackRate ValueType___Expr2Get() {
                this.GetValueTypeValues();
                return this.@__Expr2Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr3GetTree() {
                
                #line 76 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                System.Linq.Expressions.Expression<System.Func<int>> expression = () => 
        PaymentMemoID;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public int @__Expr3Get() {
                
                #line 76 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                return 
        PaymentMemoID;
                
                #line default
                #line hidden
            }
            
            public int ValueType___Expr3Get() {
                this.GetValueTypeValues();
                return this.@__Expr3Get();
            }
            
            internal System.Linq.Expressions.Expression @__Expr4GetTree() {
                
                #line 85 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                System.Linq.Expressions.Expression<System.Func<string>> expression = () => 
          IncomingStatus;
                
                #line default
                #line hidden
                return base.RewriteExpressionTree(expression);
            }
            
            [System.Diagnostics.DebuggerHiddenAttribute()]
            public string @__Expr4Get() {
                
                #line 85 "E:\DSP\PROD COPY\BROKERAGEONLINE.WORKFLOW\WORKFLOWS\RACKRATESTATUS.XAML"
                return 
          IncomingStatus;
                
                #line default
                #line hidden
            }
            
            public string ValueType___Expr4Get() {
                this.GetValueTypeValues();
                return this.@__Expr4Get();
            }
            
            protected override void GetValueTypeValues() {
                this.UserID = ((int)(this.GetVariableValue((1 + locationsOffset))));
                this.PaymentMemoID = ((int)(this.GetVariableValue((4 + locationsOffset))));
                this.MemoTypeID = ((int)(this.GetVariableValue((5 + locationsOffset))));
                base.GetValueTypeValues();
            }
            
            public new static bool Validate(System.Collections.Generic.IList<System.Activities.LocationReference> locationReferences, bool validateLocationCount, int offset) {
                if (((validateLocationCount == true) 
                            && (locationReferences.Count < 7))) {
                    return false;
                }
                if ((validateLocationCount == true)) {
                    offset = (locationReferences.Count - 7);
                }
                expectedLocationsCount = 7;
                if (((locationReferences[(offset + 0)].Name != "IncomingStatus") 
                            || (locationReferences[(offset + 0)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 2)].Name != "MemoDetail") 
                            || (locationReferences[(offset + 2)].Type != typeof(BrokerageOnline.TransferObjects.ViewAction)))) {
                    return false;
                }
                if (((locationReferences[(offset + 3)].Name != "Status") 
                            || (locationReferences[(offset + 3)].Type != typeof(string)))) {
                    return false;
                }
                if (((locationReferences[(offset + 6)].Name != "WorkFlowHierarchyList") 
                            || (locationReferences[(offset + 6)].Type != typeof(BrokerageOnline.TransferObjects.WorkFlowHierarchy)))) {
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
                if (((locationReferences[(offset + 5)].Name != "MemoTypeID") 
                            || (locationReferences[(offset + 5)].Type != typeof(int)))) {
                    return false;
                }
                return RackRateStatus_TypedDataContext0_ForReadOnly.Validate(locationReferences, false, offset);
            }
        }
    }
}
