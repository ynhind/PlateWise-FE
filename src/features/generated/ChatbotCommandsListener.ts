// Generated from src/features/grammar/ChatbotCommands.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `ChatbotCommandsParser`.
 */
export interface ChatbotCommandsListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `CmdSearchCategory`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdSearchCategory?: (ctx: CmdSearchCategoryContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdSearchCategory`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdSearchCategory?: (ctx: CmdSearchCategoryContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdSearchIngredients`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdSearchIngredients?: (ctx: CmdSearchIngredientsContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdSearchIngredients`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdSearchIngredients?: (ctx: CmdSearchIngredientsContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdSearchName`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdSearchName?: (ctx: CmdSearchNameContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdSearchName`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdSearchName?: (ctx: CmdSearchNameContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdNutritionQuery`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdNutritionQuery?: (ctx: CmdNutritionQueryContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdNutritionQuery`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdNutritionQuery?: (ctx: CmdNutritionQueryContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdNutritionDetail`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdNutritionDetail?: (ctx: CmdNutritionDetailContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdNutritionDetail`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdNutritionDetail?: (ctx: CmdNutritionDetailContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdMealSuggestion`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdMealSuggestion?: (ctx: CmdMealSuggestionContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdMealSuggestion`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdMealSuggestion?: (ctx: CmdMealSuggestionContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdMealPlan`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdMealPlan?: (ctx: CmdMealPlanContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdMealPlan`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdMealPlan?: (ctx: CmdMealPlanContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdDietCheck`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdDietCheck?: (ctx: CmdDietCheckContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdDietCheck`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdDietCheck?: (ctx: CmdDietCheckContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdNutrientCheck`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdNutrientCheck?: (ctx: CmdNutrientCheckContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdNutrientCheck`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdNutrientCheck?: (ctx: CmdNutrientCheckContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdLogMealContext`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdLogMealContext?: (ctx: CmdLogMealContextContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdLogMealContext`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdLogMealContext?: (ctx: CmdLogMealContextContext) => void;

	/**
	 * Enter a parse tree produced by the `CmdLogMealCustom`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCmdLogMealCustom?: (ctx: CmdLogMealCustomContext) => void;
	/**
	 * Exit a parse tree produced by the `CmdLogMealCustom`
	 * labeled alternative in `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCmdLogMealCustom?: (ctx: CmdLogMealCustomContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	enterCommand?: (ctx: CommandContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.command`.
	 * @param ctx the parse tree
	 */
	exitCommand?: (ctx: CommandContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.searchByIngredients`.
	 * @param ctx the parse tree
	 */
	enterSearchByIngredients?: (ctx: SearchByIngredientsContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.searchByIngredients`.
	 * @param ctx the parse tree
	 */
	exitSearchByIngredients?: (ctx: SearchByIngredientsContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.ingredientList`.
	 * @param ctx the parse tree
	 */
	enterIngredientList?: (ctx: IngredientListContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.ingredientList`.
	 * @param ctx the parse tree
	 */
	exitIngredientList?: (ctx: IngredientListContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.separator`.
	 * @param ctx the parse tree
	 */
	enterSeparator?: (ctx: SeparatorContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.separator`.
	 * @param ctx the parse tree
	 */
	exitSeparator?: (ctx: SeparatorContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.ingredient`.
	 * @param ctx the parse tree
	 */
	enterIngredient?: (ctx: IngredientContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.ingredient`.
	 * @param ctx the parse tree
	 */
	exitIngredient?: (ctx: IngredientContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.searchByName`.
	 * @param ctx the parse tree
	 */
	enterSearchByName?: (ctx: SearchByNameContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.searchByName`.
	 * @param ctx the parse tree
	 */
	exitSearchByName?: (ctx: SearchByNameContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.recipeNamePhrase`.
	 * @param ctx the parse tree
	 */
	enterRecipeNamePhrase?: (ctx: RecipeNamePhraseContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.recipeNamePhrase`.
	 * @param ctx the parse tree
	 */
	exitRecipeNamePhrase?: (ctx: RecipeNamePhraseContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.searchByCategory`.
	 * @param ctx the parse tree
	 */
	enterSearchByCategory?: (ctx: SearchByCategoryContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.searchByCategory`.
	 * @param ctx the parse tree
	 */
	exitSearchByCategory?: (ctx: SearchByCategoryContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.nutritionQuery`.
	 * @param ctx the parse tree
	 */
	enterNutritionQuery?: (ctx: NutritionQueryContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.nutritionQuery`.
	 * @param ctx the parse tree
	 */
	exitNutritionQuery?: (ctx: NutritionQueryContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.nutritionDetail`.
	 * @param ctx the parse tree
	 */
	enterNutritionDetail?: (ctx: NutritionDetailContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.nutritionDetail`.
	 * @param ctx the parse tree
	 */
	exitNutritionDetail?: (ctx: NutritionDetailContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.mealSuggestion`.
	 * @param ctx the parse tree
	 */
	enterMealSuggestion?: (ctx: MealSuggestionContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.mealSuggestion`.
	 * @param ctx the parse tree
	 */
	exitMealSuggestion?: (ctx: MealSuggestionContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.mealPlan`.
	 * @param ctx the parse tree
	 */
	enterMealPlan?: (ctx: MealPlanContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.mealPlan`.
	 * @param ctx the parse tree
	 */
	exitMealPlan?: (ctx: MealPlanContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.dietCheck`.
	 * @param ctx the parse tree
	 */
	enterDietCheck?: (ctx: DietCheckContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.dietCheck`.
	 * @param ctx the parse tree
	 */
	exitDietCheck?: (ctx: DietCheckContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.nutrientCheck`.
	 * @param ctx the parse tree
	 */
	enterNutrientCheck?: (ctx: NutrientCheckContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.nutrientCheck`.
	 * @param ctx the parse tree
	 */
	exitNutrientCheck?: (ctx: NutrientCheckContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.logMealContext`.
	 * @param ctx the parse tree
	 */
	enterLogMealContext?: (ctx: LogMealContextContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.logMealContext`.
	 * @param ctx the parse tree
	 */
	exitLogMealContext?: (ctx: LogMealContextContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.logMealCustom`.
	 * @param ctx the parse tree
	 */
	enterLogMealCustom?: (ctx: LogMealCustomContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.logMealCustom`.
	 * @param ctx the parse tree
	 */
	exitLogMealCustom?: (ctx: LogMealCustomContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.customFoodPhrase`.
	 * @param ctx the parse tree
	 */
	enterCustomFoodPhrase?: (ctx: CustomFoodPhraseContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.customFoodPhrase`.
	 * @param ctx the parse tree
	 */
	exitCustomFoodPhrase?: (ctx: CustomFoodPhraseContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.amount`.
	 * @param ctx the parse tree
	 */
	enterAmount?: (ctx: AmountContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.amount`.
	 * @param ctx the parse tree
	 */
	exitAmount?: (ctx: AmountContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.category`.
	 * @param ctx the parse tree
	 */
	enterCategory?: (ctx: CategoryContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.category`.
	 * @param ctx the parse tree
	 */
	exitCategory?: (ctx: CategoryContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.mealTime`.
	 * @param ctx the parse tree
	 */
	enterMealTime?: (ctx: MealTimeContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.mealTime`.
	 * @param ctx the parse tree
	 */
	exitMealTime?: (ctx: MealTimeContext) => void;

	/**
	 * Enter a parse tree produced by `ChatbotCommandsParser.timeRange`.
	 * @param ctx the parse tree
	 */
	enterTimeRange?: (ctx: TimeRangeContext) => void;
	/**
	 * Exit a parse tree produced by `ChatbotCommandsParser.timeRange`.
	 * @param ctx the parse tree
	 */
	exitTimeRange?: (ctx: TimeRangeContext) => void;
}

