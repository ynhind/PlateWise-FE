// Generated from src/features/grammar/ChatbotCommands.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { CmdSearchCategoryContext } from "./ChatbotCommandsParser";
import { CmdSearchIngredientsContext } from "./ChatbotCommandsParser";
import { CmdSearchNameContext } from "./ChatbotCommandsParser";
import { CmdNutritionQueryContext } from "./ChatbotCommandsParser";
import { CmdNutritionDetailContext } from "./ChatbotCommandsParser";
import { CmdMealSuggestionContext } from "./ChatbotCommandsParser";
import { CmdMealPlanContext } from "./ChatbotCommandsParser";
import { CmdDietCheckContext } from "./ChatbotCommandsParser";
import { CmdNutrientCheckContext } from "./ChatbotCommandsParser";
import { CmdLogMealContextContext } from "./ChatbotCommandsParser";
import { CmdLogMealCustomContext } from "./ChatbotCommandsParser";
import { CommandContext } from "./ChatbotCommandsParser";
import { SearchByIngredientsContext } from "./ChatbotCommandsParser";
import { IngredientListContext } from "./ChatbotCommandsParser";
import { SeparatorContext } from "./ChatbotCommandsParser";
import { IngredientContext } from "./ChatbotCommandsParser";
import { SearchByNameContext } from "./ChatbotCommandsParser";
import { RecipeNamePhraseContext } from "./ChatbotCommandsParser";
import { SearchByCategoryContext } from "./ChatbotCommandsParser";
import { NutritionQueryContext } from "./ChatbotCommandsParser";
import { NutritionDetailContext } from "./ChatbotCommandsParser";
import { MealSuggestionContext } from "./ChatbotCommandsParser";
import { MealPlanContext } from "./ChatbotCommandsParser";
import { DietCheckContext } from "./ChatbotCommandsParser";
import { NutrientCheckContext } from "./ChatbotCommandsParser";
import { LogMealContextContext } from "./ChatbotCommandsParser";
import { LogMealCustomContext } from "./ChatbotCommandsParser";
import { CustomFoodPhraseContext } from "./ChatbotCommandsParser";
import { AmountContext } from "./ChatbotCommandsParser";
import { CategoryContext } from "./ChatbotCommandsParser";
import { MealTimeContext } from "./ChatbotCommandsParser";
import { TimeRangeContext } from "./ChatbotCommandsParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ChatbotCommandsParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ChatbotCommandsVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `CmdSearchCategory`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdSearchCategory?: (ctx: CmdSearchCategoryContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdSearchIngredients`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdSearchIngredients?: (ctx: CmdSearchIngredientsContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdSearchName`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdSearchName?: (ctx: CmdSearchNameContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdNutritionQuery`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdNutritionQuery?: (ctx: CmdNutritionQueryContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdNutritionDetail`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdNutritionDetail?: (ctx: CmdNutritionDetailContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdMealSuggestion`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdMealSuggestion?: (ctx: CmdMealSuggestionContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdMealPlan`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdMealPlan?: (ctx: CmdMealPlanContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdDietCheck`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdDietCheck?: (ctx: CmdDietCheckContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdNutrientCheck`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdNutrientCheck?: (ctx: CmdNutrientCheckContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdLogMealContext`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdLogMealContext?: (ctx: CmdLogMealContextContext) => Result;

	/**
	 * Visit a parse tree produced by the `CmdLogMealCustom`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdLogMealCustom?: (ctx: CmdLogMealCustomContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommand?: (ctx: CommandContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.searchByIngredients`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchByIngredients?: (ctx: SearchByIngredientsContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.ingredientList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIngredientList?: (ctx: IngredientListContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.separator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSeparator?: (ctx: SeparatorContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.ingredient`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIngredient?: (ctx: IngredientContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.searchByName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchByName?: (ctx: SearchByNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.recipeNamePhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecipeNamePhrase?: (ctx: RecipeNamePhraseContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.searchByCategory`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchByCategory?: (ctx: SearchByCategoryContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.nutritionQuery`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNutritionQuery?: (ctx: NutritionQueryContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.nutritionDetail`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNutritionDetail?: (ctx: NutritionDetailContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.mealSuggestion`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMealSuggestion?: (ctx: MealSuggestionContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.mealPlan`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMealPlan?: (ctx: MealPlanContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.dietCheck`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDietCheck?: (ctx: DietCheckContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.nutrientCheck`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNutrientCheck?: (ctx: NutrientCheckContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.logMealContext`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogMealContext?: (ctx: LogMealContextContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.logMealCustom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogMealCustom?: (ctx: LogMealCustomContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.customFoodPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCustomFoodPhrase?: (ctx: CustomFoodPhraseContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.amount`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAmount?: (ctx: AmountContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.category`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCategory?: (ctx: CategoryContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.mealTime`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMealTime?: (ctx: MealTimeContext) => Result;

	/**
	 * Visit a parse tree produced by `ChatbotCommandsParser.timeRange`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeRange?: (ctx: TimeRangeContext) => Result;
}

