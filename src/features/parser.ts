import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ChatbotCommandsLexer } from './generated/ChatbotCommandsLexer';
import { 
    ChatbotCommandsParser, 
    CmdSearchIngredientsContext,
    CmdSearchNameContext,
    CmdSearchCategoryContext,
    CmdNutritionQueryContext,
    CmdNutritionDetailContext,
    CmdMealSuggestionContext,
    CmdMealPlanContext,
    CmdDietCheckContext,
    CmdNutrientCheckContext,
    CmdLogMealContextContext,
    CmdLogMealCustomContext,
    CmdHelpContext
} from './generated/ChatbotCommandsParser';
import { ChatbotCommandsVisitor } from './generated/ChatbotCommandsVisitor';

import { AST, MealType, RecipeCategory, NutritionMetric } from './types'; 

class CommandVisitor extends AbstractParseTreeVisitor<AST> implements ChatbotCommandsVisitor<AST> {
    
    protected defaultResult(): AST {
        return {
            type: "PARSE_ERROR",
            payload: { message: "Command not recognized" }
        };
    }

    // 1. Search By Ingredients
    visitCmdSearchIngredients(ctx: CmdSearchIngredientsContext): AST {
        const ingredients = ctx.searchByIngredients().ingredientList().ingredient().map(node => node.text);
        return {
            type: "RECIPE_SEARCH_BY_INGREDIENTS",
            payload: { ingredients }
        };
    }

    // 2. Search By Name
    visitCmdSearchName(ctx: CmdSearchNameContext): AST {
        // ✅ MỚI (Đúng): Lấy mảng WORD và nối bằng dấu cách
        const namePhrase = ctx.searchByName().recipeNamePhrase();
        // Lưu ý: Nếu trong grammar bạn đặt tên là TEXT hay ID thì thay WORD() bằng cái đó
        const name = namePhrase.WORD().map(node => node.text).join(" ");
        return {
            type: "RECIPE_SEARCH_BY_NAME",
            payload: { recipeName: name }
        };
    }

    // 3. Search By Category
    visitCmdSearchCategory(ctx: CmdSearchCategoryContext): AST {
        // FIX: Gọi qua searchByCategory()
        const subCtx = ctx.searchByCategory();
        const category = subCtx.category()?.text as RecipeCategory | undefined;
        const mealTime = subCtx.mealTime()?.text as MealType | undefined;
        return {
            type: "RECIPE_SEARCH_BY_CATEGORY",
            payload: { category, mealTime }
        };
    }

    // 4. Nutrition Query
    visitCmdNutritionQuery(ctx: CmdNutritionQueryContext): AST {
        const subCtx = ctx.nutritionQuery();
        const metric = (subCtx.NUTRIENT()?.text || "calories") as NutritionMetric;        // Fallback cho trường hợp "how much did i eat" không có nutrient cụ thể
        const finalMetric = metric || "calories"; 
        const timeRange = (subCtx.timeRange()?.text || "today") as "today" | "week" | "month";        
        return {
            type: "NUTRITION_QUERY",
            payload: { metric: finalMetric, timeRange }
        };
    }

    // 5. Nutrition Detail
    visitCmdNutritionDetail(ctx: CmdNutritionDetailContext): AST {
        const subCtx = ctx.nutritionDetail();
        const metric = subCtx.NUTRIENT().text as NutritionMetric;
        const timeRange = (subCtx.timeRange()?.text || "today") as "today" | "week" | "month";
        return {
            type: "NUTRITION_DETAIL",
            payload: { metric, timeRange }
        };
    }

    // 6. Meal Suggestion
    visitCmdMealSuggestion(ctx: CmdMealSuggestionContext): AST {
        const subCtx = ctx.mealSuggestion();
        const category = subCtx.category()?.text as RecipeCategory | undefined;
        const mealTime = subCtx.mealTime().text as MealType;
        return {
            type: "MEAL_SUGGESTION",
            payload: { category, mealTime }
        };
    }

    // 7. Meal Plan
    visitCmdMealPlan(ctx: CmdMealPlanContext): AST {
        const subCtx = ctx.mealPlan();
        const timeRange = subCtx.timeRange()?.text || "today";
        return {
            type: "MEAL_PLAN",
            payload: { planDate: timeRange }
        };
    }

    // 8. Diet Check
    visitCmdDietCheck(ctx: CmdDietCheckContext): AST {
        return {
            type: "DIET_BALANCE_CHECK",
            payload: { nutrient: "general" } // Payload mẫu
        };
    }

    // 9. Nutrient Check
    visitCmdNutrientCheck(ctx: CmdNutrientCheckContext): AST {
        const subCtx = ctx.nutrientCheck();
        return {
            type: "NUTRIENT_CHECK",
            payload: { nutrient: subCtx.NUTRIENT().text }
        };
    }

    // 10. Log Context
    visitCmdLogMealContext(ctx: CmdLogMealContextContext): AST {
        const subCtx = ctx.logMealContext();
        return {
            type: "MEAL_LOG",
            payload: { 
                mealType: subCtx.mealTime().text as MealType 
            }
        };
    }

    // 11. Log Custom
    visitCmdLogMealCustom(ctx: CmdLogMealCustomContext): AST {
        const subCtx = ctx.logMealCustom();
        const mealType = subCtx.mealTime().text as MealType;
        const foodPhrase = subCtx.customFoodPhrase();
        const foodName = foodPhrase.WORD().map(w => w.text).join(" ");

        const calories = parseInt(subCtx.amount().text);

        return {
            type: "MEAL_LOG_CUSTOM",
            payload: {
                mealType,
                customMeal: {
                    name: foodName,
                    calories: calories
                }
            }
        };
    }
    // 12. Help Command
    visitCmdHelp(ctx: CmdHelpContext): AST {
        return {
            type: "HELP_REQUEST",
            payload: {} 
        };
    }
}

// --- MAIN PARSE FUNCTION ---
export const parse = (input: string): AST => {
    const chars = CharStreams.fromString(input.toLowerCase());
    const lexer = new ChatbotCommandsLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new ChatbotCommandsParser(tokens);
    
    parser.removeErrorListeners();

    const tree = parser.command();

    if (parser.numberOfSyntaxErrors > 0) {
        return {
            type: "PARSE_ERROR",
            payload: { message: "Sorry, I didn't understand that command." },
            metadata: { originalInput: input, timestamp: new Date().toISOString() }
        };
    }

    const visitor = new CommandVisitor();
    const result = visitor.visit(tree);

    return {
        ...result,
        metadata: {
            originalInput: input,
            timestamp: new Date().toISOString(),
            confidence: 1.0 
        }
    };
};