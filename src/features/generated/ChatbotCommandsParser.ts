// Generated from src/features/grammar/ChatbotCommands.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ChatbotCommandsListener } from "./ChatbotCommandsListener";
import { ChatbotCommandsVisitor } from "./ChatbotCommandsVisitor";


export class ChatbotCommandsParser extends Parser {
	public static readonly FIND = 1;
	public static readonly SHOW = 2;
	public static readonly SEARCH_FOR = 3;
	public static readonly SUGGEST = 4;
	public static readonly RECOMMEND = 5;
	public static readonly PLAN = 6;
	public static readonly ADD = 7;
	public static readonly LOG = 8;
	public static readonly WHAT_CAN_I_COOK = 9;
	public static readonly HOW_MUCH = 10;
	public static readonly CHECK = 11;
	public static readonly INTAKE = 12;
	public static readonly AM_I_EATING = 13;
	public static readonly DO_I_HAVE = 14;
	public static readonly DID_I_EAT = 15;
	public static readonly IS = 16;
	public static readonly WITH = 17;
	public static readonly AND = 18;
	public static readonly ME = 19;
	public static readonly MY = 20;
	public static readonly A = 21;
	public static readonly THIS = 22;
	public static readonly TO = 23;
	public static readonly FOR = 24;
	public static readonly RECIPE = 25;
	public static readonly RECIPES = 26;
	public static readonly IDEAS = 27;
	public static readonly OPTIONS = 28;
	public static readonly DIET = 29;
	public static readonly BALANCED = 30;
	public static readonly ENOUGH = 31;
	public static readonly MEAL = 32;
	public static readonly MEALS = 33;
	public static readonly CREATE = 34;
	public static readonly MAKE = 35;
	public static readonly GENERATE = 36;
	public static readonly SAVE = 37;
	public static readonly COLON = 38;
	public static readonly COMMA = 39;
	public static readonly MEAL_TIME_KW = 40;
	public static readonly CATEGORY_KW = 41;
	public static readonly NUTRIENT = 42;
	public static readonly TIME_RANGE_KW = 43;
	public static readonly UNIT_CAL = 44;
	public static readonly NUMBER = 45;
	public static readonly WORD = 46;
	public static readonly WS = 47;
	public static readonly SEARCH = 48;
	public static readonly RULE_command = 0;
	public static readonly RULE_searchByIngredients = 1;
	public static readonly RULE_ingredientList = 2;
	public static readonly RULE_separator = 3;
	public static readonly RULE_ingredient = 4;
	public static readonly RULE_searchByName = 5;
	public static readonly RULE_recipeNamePhrase = 6;
	public static readonly RULE_searchByCategory = 7;
	public static readonly RULE_nutritionQuery = 8;
	public static readonly RULE_nutritionDetail = 9;
	public static readonly RULE_mealSuggestion = 10;
	public static readonly RULE_mealPlan = 11;
	public static readonly RULE_dietCheck = 12;
	public static readonly RULE_nutrientCheck = 13;
	public static readonly RULE_logMealContext = 14;
	public static readonly RULE_logMealCustom = 15;
	public static readonly RULE_customFoodPhrase = 16;
	public static readonly RULE_amount = 17;
	public static readonly RULE_category = 18;
	public static readonly RULE_mealTime = 19;
	public static readonly RULE_timeRange = 20;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"command", "searchByIngredients", "ingredientList", "separator", "ingredient", 
		"searchByName", "recipeNamePhrase", "searchByCategory", "nutritionQuery", 
		"nutritionDetail", "mealSuggestion", "mealPlan", "dietCheck", "nutrientCheck", 
		"logMealContext", "logMealCustom", "customFoodPhrase", "amount", "category", 
		"mealTime", "timeRange",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, "'show'", "'search for'", "'suggest'", "'recommend'", 
		"'plan'", "'add'", "'log'", "'what can i cook'", "'how much'", "'check'", 
		undefined, "'am i eating'", "'do i have'", "'did i eat'", "'is'", undefined, 
		"'and'", "'me'", "'my'", undefined, "'this'", "'to'", "'for'", "'recipe'", 
		"'recipes'", "'ideas'", "'options'", "'diet'", "'balanced'", "'enough'", 
		"'meal'", "'meals'", "'create'", "'make'", "'generate'", "'save'", "':'", 
		"','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "FIND", "SHOW", "SEARCH_FOR", "SUGGEST", "RECOMMEND", "PLAN", 
		"ADD", "LOG", "WHAT_CAN_I_COOK", "HOW_MUCH", "CHECK", "INTAKE", "AM_I_EATING", 
		"DO_I_HAVE", "DID_I_EAT", "IS", "WITH", "AND", "ME", "MY", "A", "THIS", 
		"TO", "FOR", "RECIPE", "RECIPES", "IDEAS", "OPTIONS", "DIET", "BALANCED", 
		"ENOUGH", "MEAL", "MEALS", "CREATE", "MAKE", "GENERATE", "SAVE", "COLON", 
		"COMMA", "MEAL_TIME_KW", "CATEGORY_KW", "NUTRIENT", "TIME_RANGE_KW", "UNIT_CAL", 
		"NUMBER", "WORD", "WS", "SEARCH",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ChatbotCommandsParser._LITERAL_NAMES, ChatbotCommandsParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ChatbotCommandsParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ChatbotCommands.g4"; }

	// @Override
	public get ruleNames(): string[] { return ChatbotCommandsParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ChatbotCommandsParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ChatbotCommandsParser._ATN, this);
	}
	// @RuleVersion(0)
	public command(): CommandContext {
		let _localctx: CommandContext = new CommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ChatbotCommandsParser.RULE_command);
		try {
			this.state = 53;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				_localctx = new CmdSearchCategoryContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 42;
				this.searchByCategory();
				}
				break;

			case 2:
				_localctx = new CmdSearchIngredientsContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 43;
				this.searchByIngredients();
				}
				break;

			case 3:
				_localctx = new CmdSearchNameContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 44;
				this.searchByName();
				}
				break;

			case 4:
				_localctx = new CmdNutritionQueryContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 45;
				this.nutritionQuery();
				}
				break;

			case 5:
				_localctx = new CmdNutritionDetailContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 46;
				this.nutritionDetail();
				}
				break;

			case 6:
				_localctx = new CmdMealSuggestionContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 47;
				this.mealSuggestion();
				}
				break;

			case 7:
				_localctx = new CmdMealPlanContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 48;
				this.mealPlan();
				}
				break;

			case 8:
				_localctx = new CmdDietCheckContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 49;
				this.dietCheck();
				}
				break;

			case 9:
				_localctx = new CmdNutrientCheckContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 50;
				this.nutrientCheck();
				}
				break;

			case 10:
				_localctx = new CmdLogMealContextContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 51;
				this.logMealContext();
				}
				break;

			case 11:
				_localctx = new CmdLogMealCustomContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 52;
				this.logMealCustom();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public searchByIngredients(): SearchByIngredientsContext {
		let _localctx: SearchByIngredientsContext = new SearchByIngredientsContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ChatbotCommandsParser.RULE_searchByIngredients);
		let _la: number;
		try {
			this.state = 64;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.FIND:
			case ChatbotCommandsParser.SHOW:
			case ChatbotCommandsParser.SEARCH:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 55;
				_la = this._input.LA(1);
				if (!(_la === ChatbotCommandsParser.FIND || _la === ChatbotCommandsParser.SHOW || _la === ChatbotCommandsParser.SEARCH)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 57;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.RECIPES) {
					{
					this.state = 56;
					this.match(ChatbotCommandsParser.RECIPES);
					}
				}

				this.state = 59;
				this.match(ChatbotCommandsParser.WITH);
				this.state = 60;
				this.ingredientList();
				}
				break;
			case ChatbotCommandsParser.WHAT_CAN_I_COOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 61;
				this.match(ChatbotCommandsParser.WHAT_CAN_I_COOK);
				this.state = 62;
				this.match(ChatbotCommandsParser.WITH);
				this.state = 63;
				this.ingredientList();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ingredientList(): IngredientListContext {
		let _localctx: IngredientListContext = new IngredientListContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ChatbotCommandsParser.RULE_ingredientList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 66;
			this.ingredient();
			this.state = 72;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ChatbotCommandsParser.AND || _la === ChatbotCommandsParser.COMMA) {
				{
				{
				this.state = 67;
				this.separator();
				this.state = 68;
				this.ingredient();
				}
				}
				this.state = 74;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public separator(): SeparatorContext {
		let _localctx: SeparatorContext = new SeparatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ChatbotCommandsParser.RULE_separator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 75;
			_la = this._input.LA(1);
			if (!(_la === ChatbotCommandsParser.AND || _la === ChatbotCommandsParser.COMMA)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ingredient(): IngredientContext {
		let _localctx: IngredientContext = new IngredientContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ChatbotCommandsParser.RULE_ingredient);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 78;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 77;
				this.match(ChatbotCommandsParser.WORD);
				}
				}
				this.state = 80;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ChatbotCommandsParser.WORD);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public searchByName(): SearchByNameContext {
		let _localctx: SearchByNameContext = new SearchByNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ChatbotCommandsParser.RULE_searchByName);
		let _la: number;
		try {
			this.state = 95;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.SHOW:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 82;
				this.match(ChatbotCommandsParser.SHOW);
				this.state = 84;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.ME) {
					{
					this.state = 83;
					this.match(ChatbotCommandsParser.ME);
					}
				}

				this.state = 86;
				this.recipeNamePhrase();
				this.state = 88;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.RECIPE) {
					{
					this.state = 87;
					this.match(ChatbotCommandsParser.RECIPE);
					}
				}

				}
				break;
			case ChatbotCommandsParser.FIND:
			case ChatbotCommandsParser.SEARCH_FOR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 90;
				_la = this._input.LA(1);
				if (!(_la === ChatbotCommandsParser.FIND || _la === ChatbotCommandsParser.SEARCH_FOR)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 91;
				this.recipeNamePhrase();
				this.state = 93;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.RECIPE) {
					{
					this.state = 92;
					this.match(ChatbotCommandsParser.RECIPE);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public recipeNamePhrase(): RecipeNamePhraseContext {
		let _localctx: RecipeNamePhraseContext = new RecipeNamePhraseContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ChatbotCommandsParser.RULE_recipeNamePhrase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 98;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 97;
				this.match(ChatbotCommandsParser.WORD);
				}
				}
				this.state = 100;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ChatbotCommandsParser.WORD);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public searchByCategory(): SearchByCategoryContext {
		let _localctx: SearchByCategoryContext = new SearchByCategoryContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ChatbotCommandsParser.RULE_searchByCategory);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 102;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ChatbotCommandsParser.FIND) | (1 << ChatbotCommandsParser.SHOW) | (1 << ChatbotCommandsParser.SUGGEST))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.CATEGORY_KW) {
				{
				this.state = 103;
				this.category();
				}
			}

			this.state = 107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.MEAL_TIME_KW) {
				{
				this.state = 106;
				this.mealTime();
				}
			}

			this.state = 110;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ChatbotCommandsParser.RECIPES) | (1 << ChatbotCommandsParser.IDEAS) | (1 << ChatbotCommandsParser.OPTIONS))) !== 0)) {
				{
				this.state = 109;
				_la = this._input.LA(1);
				if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ChatbotCommandsParser.RECIPES) | (1 << ChatbotCommandsParser.IDEAS) | (1 << ChatbotCommandsParser.OPTIONS))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nutritionQuery(): NutritionQueryContext {
		let _localctx: NutritionQueryContext = new NutritionQueryContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ChatbotCommandsParser.RULE_nutritionQuery);
		let _la: number;
		try {
			this.state = 128;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.SHOW:
			case ChatbotCommandsParser.CHECK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 112;
				_la = this._input.LA(1);
				if (!(_la === ChatbotCommandsParser.SHOW || _la === ChatbotCommandsParser.CHECK)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 114;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.MY) {
					{
					this.state = 113;
					this.match(ChatbotCommandsParser.MY);
					}
				}

				this.state = 116;
				this.match(ChatbotCommandsParser.NUTRIENT);
				this.state = 118;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.INTAKE) {
					{
					this.state = 117;
					this.match(ChatbotCommandsParser.INTAKE);
					}
				}

				this.state = 121;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.TIME_RANGE_KW) {
					{
					this.state = 120;
					this.timeRange();
					}
				}

				}
				break;
			case ChatbotCommandsParser.HOW_MUCH:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 123;
				this.match(ChatbotCommandsParser.HOW_MUCH);
				this.state = 124;
				this.match(ChatbotCommandsParser.DID_I_EAT);
				this.state = 126;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.TIME_RANGE_KW) {
					{
					this.state = 125;
					this.timeRange();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nutritionDetail(): NutritionDetailContext {
		let _localctx: NutritionDetailContext = new NutritionDetailContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ChatbotCommandsParser.RULE_nutritionDetail);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 130;
			this.match(ChatbotCommandsParser.HOW_MUCH);
			this.state = 131;
			this.match(ChatbotCommandsParser.NUTRIENT);
			this.state = 132;
			this.match(ChatbotCommandsParser.DID_I_EAT);
			this.state = 134;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.TIME_RANGE_KW) {
				{
				this.state = 133;
				this.timeRange();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mealSuggestion(): MealSuggestionContext {
		let _localctx: MealSuggestionContext = new MealSuggestionContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ChatbotCommandsParser.RULE_mealSuggestion);
		let _la: number;
		try {
			this.state = 152;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.SUGGEST:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 136;
				this.match(ChatbotCommandsParser.SUGGEST);
				this.state = 138;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.A) {
					{
					this.state = 137;
					this.match(ChatbotCommandsParser.A);
					}
				}

				this.state = 141;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.CATEGORY_KW) {
					{
					this.state = 140;
					this.category();
					}
				}

				this.state = 143;
				this.mealTime();
				}
				break;
			case ChatbotCommandsParser.RECOMMEND:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 144;
				this.match(ChatbotCommandsParser.RECOMMEND);
				this.state = 146;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.A) {
					{
					this.state = 145;
					this.match(ChatbotCommandsParser.A);
					}
				}

				this.state = 149;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.CATEGORY_KW) {
					{
					this.state = 148;
					this.category();
					}
				}

				this.state = 151;
				this.mealTime();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mealPlan(): MealPlanContext {
		let _localctx: MealPlanContext = new MealPlanContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ChatbotCommandsParser.RULE_mealPlan);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 154;
			_la = this._input.LA(1);
			if (!(((((_la - 6)) & ~0x1F) === 0 && ((1 << (_la - 6)) & ((1 << (ChatbotCommandsParser.PLAN - 6)) | (1 << (ChatbotCommandsParser.CREATE - 6)) | (1 << (ChatbotCommandsParser.MAKE - 6)) | (1 << (ChatbotCommandsParser.GENERATE - 6)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 156;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.MY || _la === ChatbotCommandsParser.A) {
				{
				this.state = 155;
				_la = this._input.LA(1);
				if (!(_la === ChatbotCommandsParser.MY || _la === ChatbotCommandsParser.A)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 159;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.MEAL || _la === ChatbotCommandsParser.MEALS) {
				{
				this.state = 158;
				_la = this._input.LA(1);
				if (!(_la === ChatbotCommandsParser.MEAL || _la === ChatbotCommandsParser.MEALS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 162;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.PLAN) {
				{
				this.state = 161;
				this.match(ChatbotCommandsParser.PLAN);
				}
			}

			this.state = 165;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.FOR) {
				{
				this.state = 164;
				this.match(ChatbotCommandsParser.FOR);
				}
			}

			this.state = 168;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.TIME_RANGE_KW) {
				{
				this.state = 167;
				this.timeRange();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dietCheck(): DietCheckContext {
		let _localctx: DietCheckContext = new DietCheckContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ChatbotCommandsParser.RULE_dietCheck);
		let _la: number;
		try {
			this.state = 181;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.IS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 170;
				this.match(ChatbotCommandsParser.IS);
				this.state = 172;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.MY) {
					{
					this.state = 171;
					this.match(ChatbotCommandsParser.MY);
					}
				}

				this.state = 174;
				this.match(ChatbotCommandsParser.DIET);
				this.state = 175;
				this.match(ChatbotCommandsParser.BALANCED);
				}
				break;
			case ChatbotCommandsParser.AM_I_EATING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 176;
				this.match(ChatbotCommandsParser.AM_I_EATING);
				this.state = 179;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ChatbotCommandsParser.BALANCED:
					{
					this.state = 177;
					this.match(ChatbotCommandsParser.BALANCED);
					}
					break;
				case ChatbotCommandsParser.CATEGORY_KW:
					{
					this.state = 178;
					this.category();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nutrientCheck(): NutrientCheckContext {
		let _localctx: NutrientCheckContext = new NutrientCheckContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ChatbotCommandsParser.RULE_nutrientCheck);
		try {
			this.state = 189;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.AM_I_EATING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 183;
				this.match(ChatbotCommandsParser.AM_I_EATING);
				this.state = 184;
				this.match(ChatbotCommandsParser.ENOUGH);
				this.state = 185;
				this.match(ChatbotCommandsParser.NUTRIENT);
				}
				break;
			case ChatbotCommandsParser.DO_I_HAVE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 186;
				this.match(ChatbotCommandsParser.DO_I_HAVE);
				this.state = 187;
				this.match(ChatbotCommandsParser.ENOUGH);
				this.state = 188;
				this.match(ChatbotCommandsParser.NUTRIENT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public logMealContext(): LogMealContextContext {
		let _localctx: LogMealContextContext = new LogMealContextContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ChatbotCommandsParser.RULE_logMealContext);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 191;
			_la = this._input.LA(1);
			if (!(((((_la - 7)) & ~0x1F) === 0 && ((1 << (_la - 7)) & ((1 << (ChatbotCommandsParser.ADD - 7)) | (1 << (ChatbotCommandsParser.LOG - 7)) | (1 << (ChatbotCommandsParser.SAVE - 7)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 193;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.THIS) {
				{
				this.state = 192;
				this.match(ChatbotCommandsParser.THIS);
				}
			}

			this.state = 196;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.TO || _la === ChatbotCommandsParser.FOR) {
				{
				this.state = 195;
				_la = this._input.LA(1);
				if (!(_la === ChatbotCommandsParser.TO || _la === ChatbotCommandsParser.FOR)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 198;
			this.mealTime();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public logMealCustom(): LogMealCustomContext {
		let _localctx: LogMealCustomContext = new LogMealCustomContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ChatbotCommandsParser.RULE_logMealCustom);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 200;
			_la = this._input.LA(1);
			if (!(_la === ChatbotCommandsParser.ADD || _la === ChatbotCommandsParser.LOG)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 202;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.TO) {
				{
				this.state = 201;
				this.match(ChatbotCommandsParser.TO);
				}
			}

			this.state = 204;
			this.mealTime();
			this.state = 206;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.COLON) {
				{
				this.state = 205;
				this.match(ChatbotCommandsParser.COLON);
				}
			}

			this.state = 208;
			this.customFoodPhrase();
			this.state = 209;
			this.amount();
			this.state = 210;
			this.match(ChatbotCommandsParser.UNIT_CAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public customFoodPhrase(): CustomFoodPhraseContext {
		let _localctx: CustomFoodPhraseContext = new CustomFoodPhraseContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ChatbotCommandsParser.RULE_customFoodPhrase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 213;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 212;
				this.match(ChatbotCommandsParser.WORD);
				}
				}
				this.state = 215;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ChatbotCommandsParser.WORD);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public amount(): AmountContext {
		let _localctx: AmountContext = new AmountContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ChatbotCommandsParser.RULE_amount);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 217;
			this.match(ChatbotCommandsParser.NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public category(): CategoryContext {
		let _localctx: CategoryContext = new CategoryContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ChatbotCommandsParser.RULE_category);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 219;
			this.match(ChatbotCommandsParser.CATEGORY_KW);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mealTime(): MealTimeContext {
		let _localctx: MealTimeContext = new MealTimeContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ChatbotCommandsParser.RULE_mealTime);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 221;
			this.match(ChatbotCommandsParser.MEAL_TIME_KW);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public timeRange(): TimeRangeContext {
		let _localctx: TimeRangeContext = new TimeRangeContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ChatbotCommandsParser.RULE_timeRange);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 223;
			this.match(ChatbotCommandsParser.TIME_RANGE_KW);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x032\xE4\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05" +
		"\x028\n\x02\x03\x03\x03\x03\x05\x03<\n\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x05\x03C\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x07\x04I\n" +
		"\x04\f\x04\x0E\x04L\v\x04\x03\x05\x03\x05\x03\x06\x06\x06Q\n\x06\r\x06" +
		"\x0E\x06R\x03\x07\x03\x07\x05\x07W\n\x07\x03\x07\x03\x07\x05\x07[\n\x07" +
		"\x03\x07\x03\x07\x03\x07\x05\x07`\n\x07\x05\x07b\n\x07\x03\b\x06\be\n" +
		"\b\r\b\x0E\bf\x03\t\x03\t\x05\tk\n\t\x03\t\x05\tn\n\t\x03\t\x05\tq\n\t" +
		"\x03\n\x03\n\x05\nu\n\n\x03\n\x03\n\x05\ny\n\n\x03\n\x05\n|\n\n\x03\n" +
		"\x03\n\x03\n\x05\n\x81\n\n\x05\n\x83\n\n\x03\v\x03\v\x03\v\x03\v\x05\v" +
		"\x89\n\v\x03\f\x03\f\x05\f\x8D\n\f\x03\f\x05\f\x90\n\f\x03\f\x03\f\x03" +
		"\f\x05\f\x95\n\f\x03\f\x05\f\x98\n\f\x03\f\x05\f\x9B\n\f\x03\r\x03\r\x05" +
		"\r\x9F\n\r\x03\r\x05\r\xA2\n\r\x03\r\x05\r\xA5\n\r\x03\r\x05\r\xA8\n\r" +
		"\x03\r\x05\r\xAB\n\r\x03\x0E\x03\x0E\x05\x0E\xAF\n\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xB6\n\x0E\x05\x0E\xB8\n\x0E\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xC0\n\x0F\x03\x10\x03\x10" +
		"\x05\x10\xC4\n\x10\x03\x10\x05\x10\xC7\n\x10\x03\x10\x03\x10\x03\x11\x03" +
		"\x11\x05\x11\xCD\n\x11\x03\x11\x03\x11\x05\x11\xD1\n\x11\x03\x11\x03\x11" +
		"\x03\x11\x03\x11\x03\x12\x06\x12\xD8\n\x12\r\x12\x0E\x12\xD9\x03\x13\x03" +
		"\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x02\x02\x02" +
		"\x17\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02" +
		"\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02" +
		"(\x02*\x02\x02\x0E\x04\x02\x03\x0422\x04\x02\x14\x14))\x04\x02\x03\x03" +
		"\x05\x05\x04\x02\x03\x04\x06\x06\x03\x02\x1C\x1E\x04\x02\x04\x04\r\r\x04" +
		"\x02\b\b$&\x03\x02\x16\x17\x03\x02\"#\x04\x02\t\n\'\'\x03\x02\x19\x1A" +
		"\x03\x02\t\n\x02\xFD\x027\x03\x02\x02\x02\x04B\x03\x02\x02\x02\x06D\x03" +
		"\x02\x02\x02\bM\x03\x02\x02\x02\nP\x03\x02\x02\x02\fa\x03\x02\x02\x02" +
		"\x0Ed\x03\x02\x02\x02\x10h\x03\x02\x02\x02\x12\x82\x03\x02\x02\x02\x14" +
		"\x84\x03\x02\x02\x02\x16\x9A\x03\x02\x02\x02\x18\x9C\x03\x02\x02\x02\x1A" +
		"\xB7\x03\x02\x02\x02\x1C\xBF\x03\x02\x02\x02\x1E\xC1\x03\x02\x02\x02 " +
		"\xCA\x03\x02\x02\x02\"\xD7\x03\x02\x02\x02$\xDB\x03\x02\x02\x02&\xDD\x03" +
		"\x02\x02\x02(\xDF\x03\x02\x02\x02*\xE1\x03\x02\x02\x02,8\x05\x10\t\x02" +
		"-8\x05\x04\x03\x02.8\x05\f\x07\x02/8\x05\x12\n\x0208\x05\x14\v\x0218\x05" +
		"\x16\f\x0228\x05\x18\r\x0238\x05\x1A\x0E\x0248\x05\x1C\x0F\x0258\x05\x1E" +
		"\x10\x0268\x05 \x11\x027,\x03\x02\x02\x027-\x03\x02\x02\x027.\x03\x02" +
		"\x02\x027/\x03\x02\x02\x0270\x03\x02\x02\x0271\x03\x02\x02\x0272\x03\x02" +
		"\x02\x0273\x03\x02\x02\x0274\x03\x02\x02\x0275\x03\x02\x02\x0276\x03\x02" +
		"\x02\x028\x03\x03\x02\x02\x029;\t\x02\x02\x02:<\x07\x1C\x02\x02;:\x03" +
		"\x02\x02\x02;<\x03\x02\x02\x02<=\x03\x02\x02\x02=>\x07\x13\x02\x02>C\x05" +
		"\x06\x04\x02?@\x07\v\x02\x02@A\x07\x13\x02\x02AC\x05\x06\x04\x02B9\x03" +
		"\x02\x02\x02B?\x03\x02\x02\x02C\x05\x03\x02\x02\x02DJ\x05\n\x06\x02EF" +
		"\x05\b\x05\x02FG\x05\n\x06\x02GI\x03\x02\x02\x02HE\x03\x02\x02\x02IL\x03" +
		"\x02\x02\x02JH\x03\x02\x02\x02JK\x03\x02\x02\x02K\x07\x03\x02\x02\x02" +
		"LJ\x03\x02\x02\x02MN\t\x03\x02\x02N\t\x03\x02\x02\x02OQ\x070\x02\x02P" +
		"O\x03\x02\x02\x02QR\x03\x02\x02\x02RP\x03\x02\x02\x02RS\x03\x02\x02\x02" +
		"S\v\x03\x02\x02\x02TV\x07\x04\x02\x02UW\x07\x15\x02\x02VU\x03\x02\x02" +
		"\x02VW\x03\x02\x02\x02WX\x03\x02\x02\x02XZ\x05\x0E\b\x02Y[\x07\x1B\x02" +
		"\x02ZY\x03\x02\x02\x02Z[\x03\x02\x02\x02[b\x03\x02\x02\x02\\]\t\x04\x02" +
		"\x02]_\x05\x0E\b\x02^`\x07\x1B\x02\x02_^\x03\x02\x02\x02_`\x03\x02\x02" +
		"\x02`b\x03\x02\x02\x02aT\x03\x02\x02\x02a\\\x03\x02\x02\x02b\r\x03\x02" +
		"\x02\x02ce\x070\x02\x02dc\x03\x02\x02\x02ef\x03\x02\x02\x02fd\x03\x02" +
		"\x02\x02fg\x03\x02\x02\x02g\x0F\x03\x02\x02\x02hj\t\x05\x02\x02ik\x05" +
		"&\x14\x02ji\x03\x02\x02\x02jk\x03\x02\x02\x02km\x03\x02\x02\x02ln\x05" +
		"(\x15\x02ml\x03\x02\x02\x02mn\x03\x02\x02\x02np\x03\x02\x02\x02oq\t\x06" +
		"\x02\x02po\x03\x02\x02\x02pq\x03\x02\x02\x02q\x11\x03\x02\x02\x02rt\t" +
		"\x07\x02\x02su\x07\x16\x02\x02ts\x03\x02\x02\x02tu\x03\x02\x02\x02uv\x03" +
		"\x02\x02\x02vx\x07,\x02\x02wy\x07\x0E\x02\x02xw\x03\x02\x02\x02xy\x03" +
		"\x02\x02\x02y{\x03\x02\x02\x02z|\x05*\x16\x02{z\x03\x02\x02\x02{|\x03" +
		"\x02\x02\x02|\x83\x03\x02\x02\x02}~\x07\f\x02\x02~\x80\x07\x11\x02\x02" +
		"\x7F\x81\x05*\x16\x02\x80\x7F\x03\x02\x02\x02\x80\x81\x03\x02\x02\x02" +
		"\x81\x83\x03\x02\x02\x02\x82r\x03\x02\x02\x02\x82}\x03\x02\x02\x02\x83" +
		"\x13\x03\x02\x02\x02\x84\x85\x07\f\x02\x02\x85\x86\x07,\x02\x02\x86\x88" +
		"\x07\x11\x02\x02\x87\x89\x05*\x16\x02\x88\x87\x03\x02\x02\x02\x88\x89" +
		"\x03\x02\x02\x02\x89\x15\x03\x02\x02\x02\x8A\x8C\x07\x06\x02\x02\x8B\x8D" +
		"\x07\x17\x02\x02\x8C\x8B\x03\x02\x02\x02\x8C\x8D\x03\x02\x02\x02\x8D\x8F" +
		"\x03\x02\x02\x02\x8E\x90\x05&\x14\x02\x8F\x8E\x03\x02\x02\x02\x8F\x90" +
		"\x03\x02\x02\x02\x90\x91\x03\x02\x02\x02\x91\x9B\x05(\x15\x02\x92\x94" +
		"\x07\x07\x02\x02\x93\x95\x07\x17\x02\x02\x94\x93\x03\x02\x02\x02\x94\x95" +
		"\x03\x02\x02\x02\x95\x97\x03\x02\x02\x02\x96\x98\x05&\x14\x02\x97\x96" +
		"\x03\x02\x02\x02\x97\x98\x03\x02\x02\x02\x98\x99\x03\x02\x02\x02\x99\x9B" +
		"\x05(\x15\x02\x9A\x8A\x03\x02\x02\x02\x9A\x92\x03\x02\x02\x02\x9B\x17" +
		"\x03\x02\x02\x02\x9C\x9E\t\b\x02\x02\x9D\x9F\t\t\x02\x02\x9E\x9D\x03\x02" +
		"\x02\x02\x9E\x9F\x03\x02\x02\x02\x9F\xA1\x03\x02\x02\x02\xA0\xA2\t\n\x02" +
		"\x02\xA1\xA0\x03\x02\x02\x02\xA1\xA2\x03\x02\x02\x02\xA2\xA4\x03\x02\x02" +
		"\x02\xA3\xA5\x07\b\x02\x02\xA4\xA3\x03\x02\x02\x02\xA4\xA5\x03\x02\x02" +
		"\x02\xA5\xA7\x03\x02\x02\x02\xA6\xA8\x07\x1A\x02\x02\xA7\xA6\x03\x02\x02" +
		"\x02\xA7\xA8\x03\x02\x02\x02\xA8\xAA\x03\x02\x02\x02\xA9\xAB\x05*\x16" +
		"\x02\xAA\xA9\x03\x02\x02\x02\xAA\xAB\x03\x02\x02\x02\xAB\x19\x03\x02\x02" +
		"\x02\xAC\xAE\x07\x12\x02\x02\xAD\xAF\x07\x16\x02\x02\xAE\xAD\x03\x02\x02" +
		"\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB0\x03\x02\x02\x02\xB0\xB1\x07\x1F\x02" +
		"\x02\xB1\xB8\x07 \x02\x02\xB2\xB5\x07\x0F\x02\x02\xB3\xB6\x07 \x02\x02" +
		"\xB4\xB6\x05&\x14\x02\xB5\xB3\x03\x02\x02\x02\xB5\xB4\x03\x02\x02\x02" +
		"\xB6\xB8\x03\x02\x02\x02\xB7\xAC\x03\x02\x02\x02\xB7\xB2\x03\x02\x02\x02" +
		"\xB8\x1B\x03\x02\x02\x02\xB9\xBA\x07\x0F\x02\x02\xBA\xBB\x07!\x02\x02" +
		"\xBB\xC0\x07,\x02\x02\xBC\xBD\x07\x10\x02\x02\xBD\xBE\x07!\x02\x02\xBE" +
		"\xC0\x07,\x02\x02\xBF\xB9\x03\x02\x02\x02\xBF\xBC\x03\x02\x02\x02\xC0" +
		"\x1D\x03\x02\x02\x02\xC1\xC3\t\v\x02\x02\xC2\xC4\x07\x18\x02\x02\xC3\xC2" +
		"\x03\x02\x02\x02\xC3\xC4\x03\x02\x02\x02\xC4\xC6\x03\x02\x02\x02\xC5\xC7" +
		"\t\f\x02\x02\xC6\xC5\x03\x02\x02\x02\xC6\xC7\x03\x02\x02\x02\xC7\xC8\x03" +
		"\x02\x02\x02\xC8\xC9\x05(\x15\x02\xC9\x1F\x03\x02\x02\x02\xCA\xCC\t\r" +
		"\x02\x02\xCB\xCD\x07\x19\x02\x02\xCC\xCB\x03\x02\x02\x02\xCC\xCD\x03\x02" +
		"\x02\x02\xCD\xCE\x03\x02\x02\x02\xCE\xD0\x05(\x15\x02\xCF\xD1\x07(\x02" +
		"\x02\xD0\xCF\x03\x02\x02\x02\xD0\xD1\x03\x02\x02\x02\xD1\xD2\x03\x02\x02" +
		"\x02\xD2\xD3\x05\"\x12\x02\xD3\xD4\x05$\x13\x02\xD4\xD5\x07.\x02\x02\xD5" +
		"!\x03\x02\x02\x02\xD6\xD8\x070\x02\x02\xD7\xD6\x03\x02\x02\x02\xD8\xD9" +
		"\x03\x02\x02\x02\xD9\xD7\x03\x02\x02\x02\xD9\xDA\x03\x02\x02\x02\xDA#" +
		"\x03\x02\x02\x02\xDB\xDC\x07/\x02\x02\xDC%\x03\x02\x02\x02\xDD\xDE\x07" +
		"+\x02\x02\xDE\'\x03\x02\x02\x02\xDF\xE0\x07*\x02\x02\xE0)\x03\x02\x02" +
		"\x02\xE1\xE2\x07-\x02\x02\xE2+\x03\x02\x02\x02(7;BJRVZ_afjmptx{\x80\x82" +
		"\x88\x8C\x8F\x94\x97\x9A\x9E\xA1\xA4\xA7\xAA\xAE\xB5\xB7\xBF\xC3\xC6\xCC" +
		"\xD0\xD9";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ChatbotCommandsParser.__ATN) {
			ChatbotCommandsParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ChatbotCommandsParser._serializedATN));
		}

		return ChatbotCommandsParser.__ATN;
	}

}

export class CommandContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_command; }
	public copyFrom(ctx: CommandContext): void {
		super.copyFrom(ctx);
	}
}
export class CmdSearchCategoryContext extends CommandContext {
	public searchByCategory(): SearchByCategoryContext {
		return this.getRuleContext(0, SearchByCategoryContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdSearchCategory) {
			listener.enterCmdSearchCategory(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdSearchCategory) {
			listener.exitCmdSearchCategory(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdSearchCategory) {
			return visitor.visitCmdSearchCategory(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdSearchIngredientsContext extends CommandContext {
	public searchByIngredients(): SearchByIngredientsContext {
		return this.getRuleContext(0, SearchByIngredientsContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdSearchIngredients) {
			listener.enterCmdSearchIngredients(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdSearchIngredients) {
			listener.exitCmdSearchIngredients(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdSearchIngredients) {
			return visitor.visitCmdSearchIngredients(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdSearchNameContext extends CommandContext {
	public searchByName(): SearchByNameContext {
		return this.getRuleContext(0, SearchByNameContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdSearchName) {
			listener.enterCmdSearchName(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdSearchName) {
			listener.exitCmdSearchName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdSearchName) {
			return visitor.visitCmdSearchName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdNutritionQueryContext extends CommandContext {
	public nutritionQuery(): NutritionQueryContext {
		return this.getRuleContext(0, NutritionQueryContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdNutritionQuery) {
			listener.enterCmdNutritionQuery(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdNutritionQuery) {
			listener.exitCmdNutritionQuery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdNutritionQuery) {
			return visitor.visitCmdNutritionQuery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdNutritionDetailContext extends CommandContext {
	public nutritionDetail(): NutritionDetailContext {
		return this.getRuleContext(0, NutritionDetailContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdNutritionDetail) {
			listener.enterCmdNutritionDetail(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdNutritionDetail) {
			listener.exitCmdNutritionDetail(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdNutritionDetail) {
			return visitor.visitCmdNutritionDetail(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdMealSuggestionContext extends CommandContext {
	public mealSuggestion(): MealSuggestionContext {
		return this.getRuleContext(0, MealSuggestionContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdMealSuggestion) {
			listener.enterCmdMealSuggestion(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdMealSuggestion) {
			listener.exitCmdMealSuggestion(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdMealSuggestion) {
			return visitor.visitCmdMealSuggestion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdMealPlanContext extends CommandContext {
	public mealPlan(): MealPlanContext {
		return this.getRuleContext(0, MealPlanContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdMealPlan) {
			listener.enterCmdMealPlan(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdMealPlan) {
			listener.exitCmdMealPlan(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdMealPlan) {
			return visitor.visitCmdMealPlan(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdDietCheckContext extends CommandContext {
	public dietCheck(): DietCheckContext {
		return this.getRuleContext(0, DietCheckContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdDietCheck) {
			listener.enterCmdDietCheck(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdDietCheck) {
			listener.exitCmdDietCheck(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdDietCheck) {
			return visitor.visitCmdDietCheck(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdNutrientCheckContext extends CommandContext {
	public nutrientCheck(): NutrientCheckContext {
		return this.getRuleContext(0, NutrientCheckContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdNutrientCheck) {
			listener.enterCmdNutrientCheck(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdNutrientCheck) {
			listener.exitCmdNutrientCheck(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdNutrientCheck) {
			return visitor.visitCmdNutrientCheck(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdLogMealContextContext extends CommandContext {
	public logMealContext(): LogMealContextContext {
		return this.getRuleContext(0, LogMealContextContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdLogMealContext) {
			listener.enterCmdLogMealContext(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdLogMealContext) {
			listener.exitCmdLogMealContext(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdLogMealContext) {
			return visitor.visitCmdLogMealContext(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CmdLogMealCustomContext extends CommandContext {
	public logMealCustom(): LogMealCustomContext {
		return this.getRuleContext(0, LogMealCustomContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdLogMealCustom) {
			listener.enterCmdLogMealCustom(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdLogMealCustom) {
			listener.exitCmdLogMealCustom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdLogMealCustom) {
			return visitor.visitCmdLogMealCustom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SearchByIngredientsContext extends ParserRuleContext {
	public WITH(): TerminalNode { return this.getToken(ChatbotCommandsParser.WITH, 0); }
	public ingredientList(): IngredientListContext {
		return this.getRuleContext(0, IngredientListContext);
	}
	public FIND(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.FIND, 0); }
	public SHOW(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SHOW, 0); }
	public SEARCH(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SEARCH, 0); }
	public RECIPES(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.RECIPES, 0); }
	public WHAT_CAN_I_COOK(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.WHAT_CAN_I_COOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_searchByIngredients; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterSearchByIngredients) {
			listener.enterSearchByIngredients(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitSearchByIngredients) {
			listener.exitSearchByIngredients(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitSearchByIngredients) {
			return visitor.visitSearchByIngredients(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IngredientListContext extends ParserRuleContext {
	public ingredient(): IngredientContext[];
	public ingredient(i: number): IngredientContext;
	public ingredient(i?: number): IngredientContext | IngredientContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IngredientContext);
		} else {
			return this.getRuleContext(i, IngredientContext);
		}
	}
	public separator(): SeparatorContext[];
	public separator(i: number): SeparatorContext;
	public separator(i?: number): SeparatorContext | SeparatorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SeparatorContext);
		} else {
			return this.getRuleContext(i, SeparatorContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_ingredientList; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterIngredientList) {
			listener.enterIngredientList(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitIngredientList) {
			listener.exitIngredientList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitIngredientList) {
			return visitor.visitIngredientList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SeparatorContext extends ParserRuleContext {
	public AND(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.AND, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.COMMA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_separator; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterSeparator) {
			listener.enterSeparator(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitSeparator) {
			listener.exitSeparator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitSeparator) {
			return visitor.visitSeparator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IngredientContext extends ParserRuleContext {
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ChatbotCommandsParser.WORD);
		} else {
			return this.getToken(ChatbotCommandsParser.WORD, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_ingredient; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterIngredient) {
			listener.enterIngredient(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitIngredient) {
			listener.exitIngredient(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitIngredient) {
			return visitor.visitIngredient(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SearchByNameContext extends ParserRuleContext {
	public SHOW(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SHOW, 0); }
	public recipeNamePhrase(): RecipeNamePhraseContext {
		return this.getRuleContext(0, RecipeNamePhraseContext);
	}
	public ME(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.ME, 0); }
	public RECIPE(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.RECIPE, 0); }
	public FIND(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.FIND, 0); }
	public SEARCH_FOR(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SEARCH_FOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_searchByName; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterSearchByName) {
			listener.enterSearchByName(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitSearchByName) {
			listener.exitSearchByName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitSearchByName) {
			return visitor.visitSearchByName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RecipeNamePhraseContext extends ParserRuleContext {
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ChatbotCommandsParser.WORD);
		} else {
			return this.getToken(ChatbotCommandsParser.WORD, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_recipeNamePhrase; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterRecipeNamePhrase) {
			listener.enterRecipeNamePhrase(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitRecipeNamePhrase) {
			listener.exitRecipeNamePhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitRecipeNamePhrase) {
			return visitor.visitRecipeNamePhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SearchByCategoryContext extends ParserRuleContext {
	public FIND(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.FIND, 0); }
	public SHOW(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SHOW, 0); }
	public SUGGEST(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SUGGEST, 0); }
	public category(): CategoryContext | undefined {
		return this.tryGetRuleContext(0, CategoryContext);
	}
	public mealTime(): MealTimeContext | undefined {
		return this.tryGetRuleContext(0, MealTimeContext);
	}
	public IDEAS(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.IDEAS, 0); }
	public RECIPES(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.RECIPES, 0); }
	public OPTIONS(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.OPTIONS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_searchByCategory; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterSearchByCategory) {
			listener.enterSearchByCategory(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitSearchByCategory) {
			listener.exitSearchByCategory(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitSearchByCategory) {
			return visitor.visitSearchByCategory(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NutritionQueryContext extends ParserRuleContext {
	public NUTRIENT(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.NUTRIENT, 0); }
	public SHOW(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SHOW, 0); }
	public CHECK(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.CHECK, 0); }
	public MY(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.MY, 0); }
	public INTAKE(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.INTAKE, 0); }
	public timeRange(): TimeRangeContext | undefined {
		return this.tryGetRuleContext(0, TimeRangeContext);
	}
	public HOW_MUCH(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.HOW_MUCH, 0); }
	public DID_I_EAT(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.DID_I_EAT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_nutritionQuery; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterNutritionQuery) {
			listener.enterNutritionQuery(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitNutritionQuery) {
			listener.exitNutritionQuery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitNutritionQuery) {
			return visitor.visitNutritionQuery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NutritionDetailContext extends ParserRuleContext {
	public HOW_MUCH(): TerminalNode { return this.getToken(ChatbotCommandsParser.HOW_MUCH, 0); }
	public NUTRIENT(): TerminalNode { return this.getToken(ChatbotCommandsParser.NUTRIENT, 0); }
	public DID_I_EAT(): TerminalNode { return this.getToken(ChatbotCommandsParser.DID_I_EAT, 0); }
	public timeRange(): TimeRangeContext | undefined {
		return this.tryGetRuleContext(0, TimeRangeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_nutritionDetail; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterNutritionDetail) {
			listener.enterNutritionDetail(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitNutritionDetail) {
			listener.exitNutritionDetail(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitNutritionDetail) {
			return visitor.visitNutritionDetail(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MealSuggestionContext extends ParserRuleContext {
	public SUGGEST(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SUGGEST, 0); }
	public mealTime(): MealTimeContext {
		return this.getRuleContext(0, MealTimeContext);
	}
	public A(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.A, 0); }
	public category(): CategoryContext | undefined {
		return this.tryGetRuleContext(0, CategoryContext);
	}
	public RECOMMEND(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.RECOMMEND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_mealSuggestion; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterMealSuggestion) {
			listener.enterMealSuggestion(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitMealSuggestion) {
			listener.exitMealSuggestion(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitMealSuggestion) {
			return visitor.visitMealSuggestion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MealPlanContext extends ParserRuleContext {
	public PLAN(): TerminalNode[];
	public PLAN(i: number): TerminalNode;
	public PLAN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ChatbotCommandsParser.PLAN);
		} else {
			return this.getToken(ChatbotCommandsParser.PLAN, i);
		}
	}
	public CREATE(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.CREATE, 0); }
	public MAKE(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.MAKE, 0); }
	public GENERATE(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.GENERATE, 0); }
	public FOR(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.FOR, 0); }
	public timeRange(): TimeRangeContext | undefined {
		return this.tryGetRuleContext(0, TimeRangeContext);
	}
	public MY(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.MY, 0); }
	public A(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.A, 0); }
	public MEAL(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.MEAL, 0); }
	public MEALS(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.MEALS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_mealPlan; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterMealPlan) {
			listener.enterMealPlan(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitMealPlan) {
			listener.exitMealPlan(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitMealPlan) {
			return visitor.visitMealPlan(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DietCheckContext extends ParserRuleContext {
	public IS(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.IS, 0); }
	public DIET(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.DIET, 0); }
	public BALANCED(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.BALANCED, 0); }
	public MY(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.MY, 0); }
	public AM_I_EATING(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.AM_I_EATING, 0); }
	public category(): CategoryContext | undefined {
		return this.tryGetRuleContext(0, CategoryContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_dietCheck; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterDietCheck) {
			listener.enterDietCheck(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitDietCheck) {
			listener.exitDietCheck(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitDietCheck) {
			return visitor.visitDietCheck(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NutrientCheckContext extends ParserRuleContext {
	public AM_I_EATING(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.AM_I_EATING, 0); }
	public ENOUGH(): TerminalNode { return this.getToken(ChatbotCommandsParser.ENOUGH, 0); }
	public NUTRIENT(): TerminalNode { return this.getToken(ChatbotCommandsParser.NUTRIENT, 0); }
	public DO_I_HAVE(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.DO_I_HAVE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_nutrientCheck; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterNutrientCheck) {
			listener.enterNutrientCheck(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitNutrientCheck) {
			listener.exitNutrientCheck(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitNutrientCheck) {
			return visitor.visitNutrientCheck(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogMealContextContext extends ParserRuleContext {
	public mealTime(): MealTimeContext {
		return this.getRuleContext(0, MealTimeContext);
	}
	public ADD(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.ADD, 0); }
	public LOG(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.LOG, 0); }
	public SAVE(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SAVE, 0); }
	public THIS(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.THIS, 0); }
	public TO(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.TO, 0); }
	public FOR(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.FOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_logMealContext; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterLogMealContext) {
			listener.enterLogMealContext(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitLogMealContext) {
			listener.exitLogMealContext(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitLogMealContext) {
			return visitor.visitLogMealContext(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogMealCustomContext extends ParserRuleContext {
	public mealTime(): MealTimeContext {
		return this.getRuleContext(0, MealTimeContext);
	}
	public customFoodPhrase(): CustomFoodPhraseContext {
		return this.getRuleContext(0, CustomFoodPhraseContext);
	}
	public amount(): AmountContext {
		return this.getRuleContext(0, AmountContext);
	}
	public UNIT_CAL(): TerminalNode { return this.getToken(ChatbotCommandsParser.UNIT_CAL, 0); }
	public LOG(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.LOG, 0); }
	public ADD(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.ADD, 0); }
	public TO(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.TO, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_logMealCustom; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterLogMealCustom) {
			listener.enterLogMealCustom(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitLogMealCustom) {
			listener.exitLogMealCustom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitLogMealCustom) {
			return visitor.visitLogMealCustom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CustomFoodPhraseContext extends ParserRuleContext {
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ChatbotCommandsParser.WORD);
		} else {
			return this.getToken(ChatbotCommandsParser.WORD, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_customFoodPhrase; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCustomFoodPhrase) {
			listener.enterCustomFoodPhrase(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCustomFoodPhrase) {
			listener.exitCustomFoodPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCustomFoodPhrase) {
			return visitor.visitCustomFoodPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AmountContext extends ParserRuleContext {
	public NUMBER(): TerminalNode { return this.getToken(ChatbotCommandsParser.NUMBER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_amount; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterAmount) {
			listener.enterAmount(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitAmount) {
			listener.exitAmount(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitAmount) {
			return visitor.visitAmount(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CategoryContext extends ParserRuleContext {
	public CATEGORY_KW(): TerminalNode { return this.getToken(ChatbotCommandsParser.CATEGORY_KW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_category; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCategory) {
			listener.enterCategory(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCategory) {
			listener.exitCategory(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCategory) {
			return visitor.visitCategory(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MealTimeContext extends ParserRuleContext {
	public MEAL_TIME_KW(): TerminalNode { return this.getToken(ChatbotCommandsParser.MEAL_TIME_KW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_mealTime; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterMealTime) {
			listener.enterMealTime(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitMealTime) {
			listener.exitMealTime(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitMealTime) {
			return visitor.visitMealTime(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimeRangeContext extends ParserRuleContext {
	public TIME_RANGE_KW(): TerminalNode { return this.getToken(ChatbotCommandsParser.TIME_RANGE_KW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_timeRange; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterTimeRange) {
			listener.enterTimeRange(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitTimeRange) {
			listener.exitTimeRange(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitTimeRange) {
			return visitor.visitTimeRange(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


