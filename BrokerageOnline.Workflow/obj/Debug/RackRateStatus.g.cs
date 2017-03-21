//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.34209
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace BrokerageOnline.Workflow.Workflows {
    
    
    [System.Runtime.InteropServices.ComVisible(false)]
    public partial class RackRateStatus : System.Activities.Activity, System.ComponentModel.ISupportInitialize {
        
        private bool _contentLoaded;
        
        private System.Activities.InArgument<int> _PaymentMemoID;
        
        private System.Activities.InArgument<int> _UserID;
        
        private System.Activities.OutArgument<BrokerageOnline.TransferObjects.ViewAction> _MemoDetail;
        
        private System.Activities.OutArgument<BrokerageOnline.TransferObjects.WorkFlowHierarchy> _WorkFlowHierarchyList;
        
        private System.Activities.InArgument<int> _MemoTypeID;
        
        private System.Activities.OutArgument<string> _Status;
        
        private System.Activities.InArgument<string> _IncomingStatus;
        
partial void BeforeInitializeComponent(ref bool isInitialized);

partial void AfterInitializeComponent();

        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("XamlBuildTask", "4.0.0.0")]
        public RackRateStatus() {
            this.InitializeComponent();
        }
        
        public System.Activities.InArgument<int> PaymentMemoID {
            get {
                return this._PaymentMemoID;
            }
            set {
                this._PaymentMemoID = value;
            }
        }
        
        public System.Activities.InArgument<int> UserID {
            get {
                return this._UserID;
            }
            set {
                this._UserID = value;
            }
        }
        
        public System.Activities.OutArgument<BrokerageOnline.TransferObjects.ViewAction> MemoDetail {
            get {
                return this._MemoDetail;
            }
            set {
                this._MemoDetail = value;
            }
        }
        
        public System.Activities.OutArgument<BrokerageOnline.TransferObjects.WorkFlowHierarchy> WorkFlowHierarchyList {
            get {
                return this._WorkFlowHierarchyList;
            }
            set {
                this._WorkFlowHierarchyList = value;
            }
        }
        
        public System.Activities.InArgument<int> MemoTypeID {
            get {
                return this._MemoTypeID;
            }
            set {
                this._MemoTypeID = value;
            }
        }
        
        public System.Activities.OutArgument<string> Status {
            get {
                return this._Status;
            }
            set {
                this._Status = value;
            }
        }
        
        public System.Activities.InArgument<string> IncomingStatus {
            get {
                return this._IncomingStatus;
            }
            set {
                this._IncomingStatus = value;
            }
        }
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("XamlBuildTask", "4.0.0.0")]
        public void InitializeComponent() {
            if ((this._contentLoaded == true)) {
                return;
            }
            this._contentLoaded = true;
            bool isInitialized = false;
            this.BeforeInitializeComponent(ref isInitialized);
            if ((isInitialized == true)) {
                this.AfterInitializeComponent();
                return;
            }
            string resourceName = this.FindResource();
            System.IO.Stream initializeXaml = typeof(RackRateStatus).Assembly.GetManifestResourceStream(resourceName);
            System.Xml.XmlReader xmlReader = null;
            System.Xaml.XamlReader reader = null;
            System.Xaml.XamlObjectWriter objectWriter = null;
            try {
                System.Xaml.XamlSchemaContext schemaContext = XamlStaticHelperNamespace._XamlStaticHelper.SchemaContext;
                xmlReader = System.Xml.XmlReader.Create(initializeXaml);
                System.Xaml.XamlXmlReaderSettings readerSettings = new System.Xaml.XamlXmlReaderSettings();
                readerSettings.LocalAssembly = System.Reflection.Assembly.GetExecutingAssembly();
                readerSettings.AllowProtectedMembersOnRoot = true;
                reader = new System.Xaml.XamlXmlReader(xmlReader, schemaContext, readerSettings);
                System.Xaml.XamlObjectWriterSettings writerSettings = new System.Xaml.XamlObjectWriterSettings();
                writerSettings.RootObjectInstance = this;
                writerSettings.AccessLevel = System.Xaml.Permissions.XamlAccessLevel.PrivateAccessTo(typeof(RackRateStatus));
                objectWriter = new System.Xaml.XamlObjectWriter(schemaContext, writerSettings);
                System.Xaml.XamlServices.Transform(reader, objectWriter);
            }
            finally {
                if ((xmlReader != null)) {
                    ((System.IDisposable)(xmlReader)).Dispose();
                }
                if ((reader != null)) {
                    ((System.IDisposable)(reader)).Dispose();
                }
                if ((objectWriter != null)) {
                    ((System.IDisposable)(objectWriter)).Dispose();
                }
            }
            this.AfterInitializeComponent();
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("XamlBuildTask", "4.0.0.0")]
        private string FindResource() {
            string[] resources = typeof(RackRateStatus).Assembly.GetManifestResourceNames();
            for (int i = 0; (i < resources.Length); i = (i + 1)) {
                string resource = resources[i];
                if ((resource.Contains(".RackRateStatus.g.xaml") || resource.Equals("RackRateStatus.g.xaml"))) {
                    return resource;
                }
            }
            throw new System.InvalidOperationException("Resource not found.");
        }
        
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1033")]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("XamlBuildTask", "4.0.0.0")]
        void System.ComponentModel.ISupportInitialize.BeginInit() {
        }
        
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1033")]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("XamlBuildTask", "4.0.0.0")]
        void System.ComponentModel.ISupportInitialize.EndInit() {
            this.InitializeComponent();
        }
    }
}
