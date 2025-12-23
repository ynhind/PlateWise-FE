grammar ChatbotCommands;

//PARSER RULES
command
    : searchByCategory         # CmdSearchCategory
    | searchByIngredients      # CmdSearchIngredients
    | searchByName             # CmdSearchName
    | nutritionQuery           # CmdNutritionQuery
    | nutritionDetail          # CmdNutritionDetail
    | mealSuggestion           # CmdMealSuggestion
    | mealPlan                 # CmdMealPlan
    | dietCheck                # CmdDietCheck
    | nutrientCheck            # CmdNutrientCheck
    | logMealContext           # CmdLogMealContext
    | logMealCustom            # CmdLogMealCustom
    | helpCommand              # CmdHelp
    ;

//Search By Ingredients: "find recipes with chicken and rice", "what can i cook with eggs"
searchByIngredients: 
    (FIND | SHOW | SEARCH) (RECIPES)? WITH ingredientList | WHAT_CAN_I_COOK WITH ingredientList;

ingredientList: ingredient (separator ingredient)* ;

separator: AND | COMMA;

ingredient: WORD+ ; 

//Search By Name: "show me pancake recipe", "find carbonara"
searchByName: SHOW ME? recipeNamePhrase (RECIPE)? | (FIND | SEARCH_FOR) recipeNamePhrase (RECIPE)? ;

recipeNamePhrase: WORD+ ;

//Search By Category: "find healthy breakfast ideas"
searchByCategory: (FIND | SHOW | SUGGEST) category? mealTime? (IDEAS | RECIPES | OPTIONS)? ;

//Nutrition: "show my calories today"
nutritionQuery: (SHOW | CHECK) MY? NUTRIENT (INTAKE)? timeRange? | HOW_MUCH DID_I_EAT timeRange? ;

//Nutrition Detail: "how much protein did i eat"
nutritionDetail: HOW_MUCH NUTRIENT DID_I_EAT timeRange? ;

//Suggestion: "suggest a low-calorie dinner"
mealSuggestion: SUGGEST A? category? mealTime | RECOMMEND A? category? mealTime;

//Plan: "plan my meal for today"
mealPlan: (PLAN | CREATE | MAKE | GENERATE) (MY | A)? (MEAL | MEALS)? (PLAN)? (FOR)? timeRange? ;

//Checks: "is my diet balanced"
dietCheck: IS (MY)? DIET BALANCED | AM_I_EATING (BALANCED | category);

//Nutrient Check: "am i eating enough protein"
nutrientCheck: AM_I_EATING ENOUGH NUTRIENT | DO_I_HAVE ENOUGH NUTRIENT;

//Log (Context): "add this to lunch"
logMealContext: (ADD | LOG | SAVE) (THIS)? (TO | FOR)? mealTime ;

//Log (Custom): "log breakfast: oatmeal 300 calories"
// Pattern: LOG <meal> <food name> <number> <unit>
logMealCustom: (LOG | ADD) (TO)? mealTime (COLON)? customFoodPhrase amount UNIT_CAL;

customFoodPhrase: WORD+ ;
amount: NUMBER ;

// Help: "help", "commands", "what can i do", "show commands"
helpCommand: (SHOW | LIST)? (AVAILABLE)? (COMMANDS | HELP) | WHAT_CAN_I_DO;


//SUB RULES
category: CATEGORY_KW ;
mealTime: MEAL_TIME_KW ;
timeRange: TIME_RANGE_KW ;


//LEXER RULES 
FIND: 'find' | 'search';
SHOW: 'show';
SEARCH_FOR: 'search for';
SUGGEST: 'suggest';
RECOMMEND: 'recommend';
PLAN: 'plan';
ADD: 'add';
LOG: 'log';
WHAT_CAN_I_COOK: 'what can i cook';
HOW_MUCH: 'how much';
CHECK: 'check';
INTAKE: 'intake' | 'consumption';
AM_I_EATING: 'am i eating';
DO_I_HAVE: 'do i have';
DID_I_EAT: 'did i eat';
IS: 'is';
WITH: 'with' | 'using';
AND: 'and';
ME: 'me';
MY: 'my';
A: 'a' | 'an';
THIS: 'this';
TO: 'to';
FOR: 'for';
RECIPE: 'recipe';
RECIPES: 'recipes';
IDEAS: 'ideas';
OPTIONS: 'options';
DIET: 'diet';
BALANCED: 'balanced';
ENOUGH: 'enough';
MEAL: 'meal';
MEALS: 'meals';
CREATE: 'create';
MAKE: 'make';
GENERATE: 'generate';
SAVE: 'save';
HELP: 'help';
COMMANDS: 'commands';
LIST: 'list';
AVAILABLE: 'available';
WHAT_CAN_I_DO: 'what can i do';
COLON: ':';
COMMA: ',' ;


//Keywords defined in types.ts
MEAL_TIME_KW: 'breakfast' | 'lunch' | 'dinner' | 'snack' ;

CATEGORY_KW: 'healthy' | 'low-calorie' | 'high-protein' | 'vegetarian' | 'vegan' | 'gluten-free' | 'quick' | 'easy' ;

NUTRIENT: 'calories' | 'protein' | 'carbs' | 'fat' | 'fiber' | 'sugar' | 'sodium' | 'nutrition' ;

TIME_RANGE_KW: (THIS | FOR)? 'today' | 'tomorrow' | 'week' | 'month' ;

UNIT_CAL: 'cal' | 'calories' | 'kcal';

NUMBER: [0-9]+ ;
WORD: [a-zA-Z0-9\u00C0-\uFFFF-]+ ; 
WS: [ \t\r\n.\?]+ -> skip; 