using System;
using System.IO;
using System.Xml;
using System.CodeDom;
using System.Workflow.Activities.Rules;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.Activities;

namespace BrokerageOnline.Workflow
{
    public class RackRateRule
    {
        private RuleSet createRuleSet;

        public void CreateRuleSet()
        {
            createRuleSet = new RuleSet("CreateRackRate");

            // Define property and activity reference expressions through CodeDom functionality
            CodeThisReferenceExpression thisRef = new CodeThisReferenceExpression();
            CodeFieldReferenceExpression RoleNameRef = new CodeFieldReferenceExpression(thisRef, "RoleName");
            CodeFieldReferenceExpression ValidityRef = new CodeFieldReferenceExpression(thisRef, "Validity");
            CodeTypeReferenceExpression RoleEnumRef = new CodeTypeReferenceExpression(typeof(RoleType));
            CodeFieldReferenceExpression OutputRef = new CodeFieldReferenceExpression(thisRef, "Output");

            // IF RoleType != "SalesAdmin" AND ValidityLimit > 3
            // THEN Output = "invalid"
            Rule createRackRateRule = new Rule("CreatRackRateRule");
            createRuleSet.Rules.Add(createRackRateRule);

            // define first predicate: RoleType != "SalesAdmin"
            CodeBinaryOperatorExpression ruleRoleName = new CodeBinaryOperatorExpression();
            ruleRoleName.Left = RoleNameRef;
            ruleRoleName.Operator = CodeBinaryOperatorType.IdentityInequality;
            ruleRoleName.Right = new CodeFieldReferenceExpression(RoleEnumRef, "SalesAdmin");

            // define second predicate: Validity > 3
            CodeBinaryOperatorExpression ruleValidityTest = new CodeBinaryOperatorExpression();
            ruleValidityTest.Left = ValidityRef;
            ruleValidityTest.Operator = CodeBinaryOperatorType.ValueEquality;
            ruleValidityTest.Right = new CodePrimitiveExpression("3");

            // join the first two predicates into a single condition
            CodeBinaryOperatorExpression ruleCondition = new CodeBinaryOperatorExpression();
            ruleCondition.Left = ruleRoleName;
            ruleCondition.Operator = CodeBinaryOperatorType.BooleanAnd;
            ruleCondition.Right = ruleValidityTest;

            createRackRateRule.Condition = new RuleExpressionCondition(ruleCondition);

            // add the action: Output = invalid
            CodeAssignStatement ruleSurchargeAction = new CodeAssignStatement(OutputRef, new CodePrimitiveExpression("invalid"));
            createRackRateRule.ThenActions.Add(new RuleStatementAction(ruleSurchargeAction));

            // Add the ruleset
            RuleDefinitions ruleDef = new RuleDefinitions();
            ruleDef.RuleSets.Add(createRuleSet);

            // Set the RuleDefinitions on the workflow
            //this.SetValue(RuleDefinitions.RuleDefinitionsProperty, ruleDef);
        }

        public enum RoleType
        {
            RM = 0,
            BM = 1,
            SalesAdmin = 2,
            HOS = 3
        }

        public void SaveRuleSet()
        {
            RuleDefinitions ruleDefinitions = new RuleDefinitions();
            ruleDefinitions.RuleSets.Add(createRuleSet);
            WorkflowMarkupSerializer serializer = new WorkflowMarkupSerializer();
            XmlTextWriter writer = new XmlTextWriter("RackRateRules.rules", System.Text.Encoding.Unicode);
            serializer.Serialize(writer, ruleDefinitions);
            writer.Close();
        }

        public void ExecuteRuleSet()
        {
            /**
            RuleEngine engine = new RuleEngine(createRuleSet, typeof(RoleType));

            // execute the rule on a shopping object where OrderValue = 100
            // expect rule action to be not fired
            Shopping shoppingUnder500 = new Shopping(100);
            engine.Execute(shoppingUnder500);
            Console.WriteLine("shoppingUnder500 - Discount evaluated: " + shoppingUnder500.Discount);

            // execute the rule on a shopping object where OrderValue = 600
            // expect rule action to be fired
            Shopping shoppingOver500 = new Shopping(600);
            engine.Execute(shoppingOver500);
            Console.WriteLine("shoppingOver500 - Discount evaluated: " + shoppingOver500.Discount);
            **/
        }
    }
}
