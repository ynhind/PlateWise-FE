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
	public static readonly HELP = 38;
	public static readonly COMMANDS = 39;
	public static readonly LIST = 40;
	public static readonly AVAILABLE = 41;
	public static readonly WHAT_CAN_I_DO = 42;
	public static readonly COLON = 43;
	public static readonly COMMA = 44;
	public static readonly MEAL_TIME_KW = 45;
	public static readonly CATEGORY_KW = 46;
	public static readonly NUTRIENT = 47;
	public static readonly TIME_RANGE_KW = 48;
	public static readonly UNIT_CAL = 49;
	public static readonly NUMBER = 50;
	public static readonly WORD = 51;
	public static readonly WS = 52;
	public static readonly SEARCH = 53;
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
	public static readonly RULE_helpCommand = 18;
	public static readonly RULE_category = 19;
	public static readonly RULE_mealTime = 20;
	public static readonly RULE_timeRange = 21;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"command", "searchByIngredients", "ingredientList", "separator", "ingredient", 
		"searchByName", "recipeNamePhrase", "searchByCategory", "nutritionQuery", 
		"nutritionDetail", "mealSuggestion", "mealPlan", "dietCheck", "nutrientCheck", 
		"logMealContext", "logMealCustom", "customFoodPhrase", "amount", "helpCommand", 
		"category", "mealTime", "timeRange",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, "'show'", "'search for'", "'suggest'", "'recommend'", 
		"'plan'", "'add'", "'log'", "'what can i cook'", "'how much'", "'check'", 
		undefined, "'am i eating'", "'do i have'", "'did i eat'", "'is'", undefined, 
		"'and'", "'me'", "'my'", undefined, "'this'", "'to'", "'for'", "'recipe'", 
		"'recipes'", "'ideas'", "'options'", "'diet'", "'balanced'", "'enough'", 
		"'meal'", "'meals'", "'create'", "'make'", "'generate'", "'save'", "'help'", 
		"'commands'", "'list'", "'available'", "'what can i do'", "':'", "','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "FIND", "SHOW", "SEARCH_FOR", "SUGGEST", "RECOMMEND", "PLAN", 
		"ADD", "LOG", "WHAT_CAN_I_COOK", "HOW_MUCH", "CHECK", "INTAKE", "AM_I_EATING", 
		"DO_I_HAVE", "DID_I_EAT", "IS", "WITH", "AND", "ME", "MY", "A", "THIS", 
		"TO", "FOR", "RECIPE", "RECIPES", "IDEAS", "OPTIONS", "DIET", "BALANCED", 
		"ENOUGH", "MEAL", "MEALS", "CREATE", "MAKE", "GENERATE", "SAVE", "HELP", 
		"COMMANDS", "LIST", "AVAILABLE", "WHAT_CAN_I_DO", "COLON", "COMMA", "MEAL_TIME_KW", 
		"CATEGORY_KW", "NUTRIENT", "TIME_RANGE_KW", "UNIT_CAL", "NUMBER", "WORD", 
		"WS", "SEARCH",
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
			this.state = 56;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				_localctx = new CmdSearchCategoryContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 44;
				this.searchByCategory();
				}
				break;

			case 2:
				_localctx = new CmdSearchIngredientsContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 45;
				this.searchByIngredients();
				}
				break;

			case 3:
				_localctx = new CmdSearchNameContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 46;
				this.searchByName();
				}
				break;

			case 4:
				_localctx = new CmdNutritionQueryContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 47;
				this.nutritionQuery();
				}
				break;

			case 5:
				_localctx = new CmdNutritionDetailContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 48;
				this.nutritionDetail();
				}
				break;

			case 6:
				_localctx = new CmdMealSuggestionContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 49;
				this.mealSuggestion();
				}
				break;

			case 7:
				_localctx = new CmdMealPlanContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 50;
				this.mealPlan();
				}
				break;

			case 8:
				_localctx = new CmdDietCheckContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 51;
				this.dietCheck();
				}
				break;

			case 9:
				_localctx = new CmdNutrientCheckContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 52;
				this.nutrientCheck();
				}
				break;

			case 10:
				_localctx = new CmdLogMealContextContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 53;
				this.logMealContext();
				}
				break;

			case 11:
				_localctx = new CmdLogMealCustomContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 54;
				this.logMealCustom();
				}
				break;

			case 12:
				_localctx = new CmdHelpContext(_localctx);
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 55;
				this.helpCommand();
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
			this.state = 67;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.FIND:
			case ChatbotCommandsParser.SHOW:
			case ChatbotCommandsParser.SEARCH:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 58;
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
				this.state = 60;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.RECIPES) {
					{
					this.state = 59;
					this.match(ChatbotCommandsParser.RECIPES);
					}
				}

				this.state = 62;
				this.match(ChatbotCommandsParser.WITH);
				this.state = 63;
				this.ingredientList();
				}
				break;
			case ChatbotCommandsParser.WHAT_CAN_I_COOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 64;
				this.match(ChatbotCommandsParser.WHAT_CAN_I_COOK);
				this.state = 65;
				this.match(ChatbotCommandsParser.WITH);
				this.state = 66;
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
			this.state = 69;
			this.ingredient();
			this.state = 75;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ChatbotCommandsParser.AND || _la === ChatbotCommandsParser.COMMA) {
				{
				{
				this.state = 70;
				this.separator();
				this.state = 71;
				this.ingredient();
				}
				}
				this.state = 77;
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
			this.state = 78;
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
			this.state = 81;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 80;
				this.match(ChatbotCommandsParser.WORD);
				}
				}
				this.state = 83;
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
			this.state = 98;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.SHOW:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 85;
				this.match(ChatbotCommandsParser.SHOW);
				this.state = 87;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.ME) {
					{
					this.state = 86;
					this.match(ChatbotCommandsParser.ME);
					}
				}

				this.state = 89;
				this.recipeNamePhrase();
				this.state = 91;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.RECIPE) {
					{
					this.state = 90;
					this.match(ChatbotCommandsParser.RECIPE);
					}
				}

				}
				break;
			case ChatbotCommandsParser.FIND:
			case ChatbotCommandsParser.SEARCH_FOR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 93;
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
				this.state = 94;
				this.recipeNamePhrase();
				this.state = 96;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.RECIPE) {
					{
					this.state = 95;
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
			this.state = 101;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 100;
				this.match(ChatbotCommandsParser.WORD);
				}
				}
				this.state = 103;
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
			this.state = 105;
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
			this.state = 107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.CATEGORY_KW) {
				{
				this.state = 106;
				this.category();
				}
			}

			this.state = 110;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.MEAL_TIME_KW) {
				{
				this.state = 109;
				this.mealTime();
				}
			}

			this.state = 113;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ChatbotCommandsParser.RECIPES) | (1 << ChatbotCommandsParser.IDEAS) | (1 << ChatbotCommandsParser.OPTIONS))) !== 0)) {
				{
				this.state = 112;
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
			this.state = 131;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.SHOW:
			case ChatbotCommandsParser.CHECK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 115;
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
				this.state = 117;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.MY) {
					{
					this.state = 116;
					this.match(ChatbotCommandsParser.MY);
					}
				}

				this.state = 119;
				this.match(ChatbotCommandsParser.NUTRIENT);
				this.state = 121;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.INTAKE) {
					{
					this.state = 120;
					this.match(ChatbotCommandsParser.INTAKE);
					}
				}

				this.state = 124;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.TIME_RANGE_KW) {
					{
					this.state = 123;
					this.timeRange();
					}
				}

				}
				break;
			case ChatbotCommandsParser.HOW_MUCH:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 126;
				this.match(ChatbotCommandsParser.HOW_MUCH);
				this.state = 127;
				this.match(ChatbotCommandsParser.DID_I_EAT);
				this.state = 129;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.TIME_RANGE_KW) {
					{
					this.state = 128;
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
			this.state = 133;
			this.match(ChatbotCommandsParser.HOW_MUCH);
			this.state = 134;
			this.match(ChatbotCommandsParser.NUTRIENT);
			this.state = 135;
			this.match(ChatbotCommandsParser.DID_I_EAT);
			this.state = 137;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.TIME_RANGE_KW) {
				{
				this.state = 136;
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
			this.state = 155;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.SUGGEST:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 139;
				this.match(ChatbotCommandsParser.SUGGEST);
				this.state = 141;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.A) {
					{
					this.state = 140;
					this.match(ChatbotCommandsParser.A);
					}
				}

				this.state = 144;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.CATEGORY_KW) {
					{
					this.state = 143;
					this.category();
					}
				}

				this.state = 146;
				this.mealTime();
				}
				break;
			case ChatbotCommandsParser.RECOMMEND:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 147;
				this.match(ChatbotCommandsParser.RECOMMEND);
				this.state = 149;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.A) {
					{
					this.state = 148;
					this.match(ChatbotCommandsParser.A);
					}
				}

				this.state = 152;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.CATEGORY_KW) {
					{
					this.state = 151;
					this.category();
					}
				}

				this.state = 154;
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
			this.state = 157;
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
			this.state = 159;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.MY || _la === ChatbotCommandsParser.A) {
				{
				this.state = 158;
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

			this.state = 162;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.MEAL || _la === ChatbotCommandsParser.MEALS) {
				{
				this.state = 161;
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

			this.state = 165;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.PLAN) {
				{
				this.state = 164;
				this.match(ChatbotCommandsParser.PLAN);
				}
			}

			this.state = 168;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.FOR) {
				{
				this.state = 167;
				this.match(ChatbotCommandsParser.FOR);
				}
			}

			this.state = 171;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.TIME_RANGE_KW) {
				{
				this.state = 170;
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
			this.state = 184;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.IS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 173;
				this.match(ChatbotCommandsParser.IS);
				this.state = 175;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.MY) {
					{
					this.state = 174;
					this.match(ChatbotCommandsParser.MY);
					}
				}

				this.state = 177;
				this.match(ChatbotCommandsParser.DIET);
				this.state = 178;
				this.match(ChatbotCommandsParser.BALANCED);
				}
				break;
			case ChatbotCommandsParser.AM_I_EATING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 179;
				this.match(ChatbotCommandsParser.AM_I_EATING);
				this.state = 182;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ChatbotCommandsParser.BALANCED:
					{
					this.state = 180;
					this.match(ChatbotCommandsParser.BALANCED);
					}
					break;
				case ChatbotCommandsParser.CATEGORY_KW:
					{
					this.state = 181;
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
			this.state = 192;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.AM_I_EATING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 186;
				this.match(ChatbotCommandsParser.AM_I_EATING);
				this.state = 187;
				this.match(ChatbotCommandsParser.ENOUGH);
				this.state = 188;
				this.match(ChatbotCommandsParser.NUTRIENT);
				}
				break;
			case ChatbotCommandsParser.DO_I_HAVE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 189;
				this.match(ChatbotCommandsParser.DO_I_HAVE);
				this.state = 190;
				this.match(ChatbotCommandsParser.ENOUGH);
				this.state = 191;
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
			this.state = 194;
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
			this.state = 196;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.THIS) {
				{
				this.state = 195;
				this.match(ChatbotCommandsParser.THIS);
				}
			}

			this.state = 199;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.TO || _la === ChatbotCommandsParser.FOR) {
				{
				this.state = 198;
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

			this.state = 201;
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
			this.state = 203;
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
			this.state = 205;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.TO) {
				{
				this.state = 204;
				this.match(ChatbotCommandsParser.TO);
				}
			}

			this.state = 207;
			this.mealTime();
			this.state = 209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ChatbotCommandsParser.COLON) {
				{
				this.state = 208;
				this.match(ChatbotCommandsParser.COLON);
				}
			}

			this.state = 211;
			this.customFoodPhrase();
			this.state = 212;
			this.amount();
			this.state = 213;
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
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 215;
				this.match(ChatbotCommandsParser.WORD);
				}
				}
				this.state = 218;
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
			this.state = 220;
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
	public helpCommand(): HelpCommandContext {
		let _localctx: HelpCommandContext = new HelpCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ChatbotCommandsParser.RULE_helpCommand);
		let _la: number;
		try {
			this.state = 230;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ChatbotCommandsParser.SHOW:
			case ChatbotCommandsParser.HELP:
			case ChatbotCommandsParser.COMMANDS:
			case ChatbotCommandsParser.LIST:
			case ChatbotCommandsParser.AVAILABLE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 223;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.SHOW || _la === ChatbotCommandsParser.LIST) {
					{
					this.state = 222;
					_la = this._input.LA(1);
					if (!(_la === ChatbotCommandsParser.SHOW || _la === ChatbotCommandsParser.LIST)) {
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

				this.state = 226;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ChatbotCommandsParser.AVAILABLE) {
					{
					this.state = 225;
					this.match(ChatbotCommandsParser.AVAILABLE);
					}
				}

				this.state = 228;
				_la = this._input.LA(1);
				if (!(_la === ChatbotCommandsParser.HELP || _la === ChatbotCommandsParser.COMMANDS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			case ChatbotCommandsParser.WHAT_CAN_I_DO:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 229;
				this.match(ChatbotCommandsParser.WHAT_CAN_I_DO);
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
	public category(): CategoryContext {
		let _localctx: CategoryContext = new CategoryContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ChatbotCommandsParser.RULE_category);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 232;
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
		this.enterRule(_localctx, 40, ChatbotCommandsParser.RULE_mealTime);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 234;
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
		this.enterRule(_localctx, 42, ChatbotCommandsParser.RULE_timeRange);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 236;
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x037\xF1\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x05\x02;\n\x02\x03\x03\x03\x03\x05\x03?\n\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03F\n\x03\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x07\x04L\n\x04\f\x04\x0E\x04O\v\x04\x03\x05\x03\x05\x03\x06" +
		"\x06\x06T\n\x06\r\x06\x0E\x06U\x03\x07\x03\x07\x05\x07Z\n\x07\x03\x07" +
		"\x03\x07\x05\x07^\n\x07\x03\x07\x03\x07\x03\x07\x05\x07c\n\x07\x05\x07" +
		"e\n\x07\x03\b\x06\bh\n\b\r\b\x0E\bi\x03\t\x03\t\x05\tn\n\t\x03\t\x05\t" +
		"q\n\t\x03\t\x05\tt\n\t\x03\n\x03\n\x05\nx\n\n\x03\n\x03\n\x05\n|\n\n\x03" +
		"\n\x05\n\x7F\n\n\x03\n\x03\n\x03\n\x05\n\x84\n\n\x05\n\x86\n\n\x03\v\x03" +
		"\v\x03\v\x03\v\x05\v\x8C\n\v\x03\f\x03\f\x05\f\x90\n\f\x03\f\x05\f\x93" +
		"\n\f\x03\f\x03\f\x03\f\x05\f\x98\n\f\x03\f\x05\f\x9B\n\f\x03\f\x05\f\x9E" +
		"\n\f\x03\r\x03\r\x05\r\xA2\n\r\x03\r\x05\r\xA5\n\r\x03\r\x05\r\xA8\n\r" +
		"\x03\r\x05\r\xAB\n\r\x03\r\x05\r\xAE\n\r\x03\x0E\x03\x0E\x05\x0E\xB2\n" +
		"\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xB9\n\x0E\x05\x0E" +
		"\xBB\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xC3" +
		"\n\x0F\x03\x10\x03\x10\x05\x10\xC7\n\x10\x03\x10\x05\x10\xCA\n\x10\x03" +
		"\x10\x03\x10\x03\x11\x03\x11\x05\x11\xD0\n\x11\x03\x11\x03\x11\x05\x11" +
		"\xD4\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x06\x12\xDB\n\x12\r" +
		"\x12\x0E\x12\xDC\x03\x13\x03\x13\x03\x14\x05\x14\xE2\n\x14\x03\x14\x05" +
		"\x14\xE5\n\x14\x03\x14\x03\x14\x05\x14\xE9\n\x14\x03\x15\x03\x15\x03\x16" +
		"\x03\x16\x03\x17\x03\x17\x03\x17\x02\x02\x02\x18\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02\x02\x10\x04\x02" +
		"\x03\x0477\x04\x02\x14\x14..\x04\x02\x03\x03\x05\x05\x04\x02\x03\x04\x06" +
		"\x06\x03\x02\x1C\x1E\x04\x02\x04\x04\r\r\x04\x02\b\b$&\x03\x02\x16\x17" +
		"\x03\x02\"#\x04\x02\t\n\'\'\x03\x02\x19\x1A\x03\x02\t\n\x04\x02\x04\x04" +
		"**\x03\x02()\x02\u010D\x02:\x03\x02\x02\x02\x04E\x03\x02\x02\x02\x06G" +
		"\x03\x02\x02\x02\bP\x03\x02\x02\x02\nS\x03\x02\x02\x02\fd\x03\x02\x02" +
		"\x02\x0Eg\x03\x02\x02\x02\x10k\x03\x02\x02\x02\x12\x85\x03\x02\x02\x02" +
		"\x14\x87\x03\x02\x02\x02\x16\x9D\x03\x02\x02\x02\x18\x9F\x03\x02\x02\x02" +
		"\x1A\xBA\x03\x02\x02\x02\x1C\xC2\x03\x02\x02\x02\x1E\xC4\x03\x02\x02\x02" +
		" \xCD\x03\x02\x02\x02\"\xDA\x03\x02\x02\x02$\xDE\x03\x02\x02\x02&\xE8" +
		"\x03\x02\x02\x02(\xEA\x03\x02\x02\x02*\xEC\x03\x02\x02\x02,\xEE\x03\x02" +
		"\x02\x02.;\x05\x10\t\x02/;\x05\x04\x03\x020;\x05\f\x07\x021;\x05\x12\n" +
		"\x022;\x05\x14\v\x023;\x05\x16\f\x024;\x05\x18\r\x025;\x05\x1A\x0E\x02" +
		"6;\x05\x1C\x0F\x027;\x05\x1E\x10\x028;\x05 \x11\x029;\x05&\x14\x02:.\x03" +
		"\x02\x02\x02:/\x03\x02\x02\x02:0\x03\x02\x02\x02:1\x03\x02\x02\x02:2\x03" +
		"\x02\x02\x02:3\x03\x02\x02\x02:4\x03\x02\x02\x02:5\x03\x02\x02\x02:6\x03" +
		"\x02\x02\x02:7\x03\x02\x02\x02:8\x03\x02\x02\x02:9\x03\x02\x02\x02;\x03" +
		"\x03\x02\x02\x02<>\t\x02\x02\x02=?\x07\x1C\x02\x02>=\x03\x02\x02\x02>" +
		"?\x03\x02\x02\x02?@\x03\x02\x02\x02@A\x07\x13\x02\x02AF\x05\x06\x04\x02" +
		"BC\x07\v\x02\x02CD\x07\x13\x02\x02DF\x05\x06\x04\x02E<\x03\x02\x02\x02" +
		"EB\x03\x02\x02\x02F\x05\x03\x02\x02\x02GM\x05\n\x06\x02HI\x05\b\x05\x02" +
		"IJ\x05\n\x06\x02JL\x03\x02\x02\x02KH\x03\x02\x02\x02LO\x03\x02\x02\x02" +
		"MK\x03\x02\x02\x02MN\x03\x02\x02\x02N\x07\x03\x02\x02\x02OM\x03\x02\x02" +
		"\x02PQ\t\x03\x02\x02Q\t\x03\x02\x02\x02RT\x075\x02\x02SR\x03\x02\x02\x02" +
		"TU\x03\x02\x02\x02US\x03\x02\x02\x02UV\x03\x02\x02\x02V\v\x03\x02\x02" +
		"\x02WY\x07\x04\x02\x02XZ\x07\x15\x02\x02YX\x03\x02\x02\x02YZ\x03\x02\x02" +
		"\x02Z[\x03\x02\x02\x02[]\x05\x0E\b\x02\\^\x07\x1B\x02\x02]\\\x03\x02\x02" +
		"\x02]^\x03\x02\x02\x02^e\x03\x02\x02\x02_`\t\x04\x02\x02`b\x05\x0E\b\x02" +
		"ac\x07\x1B\x02\x02ba\x03\x02\x02\x02bc\x03\x02\x02\x02ce\x03\x02\x02\x02" +
		"dW\x03\x02\x02\x02d_\x03\x02\x02\x02e\r\x03\x02\x02\x02fh\x075\x02\x02" +
		"gf\x03\x02\x02\x02hi\x03\x02\x02\x02ig\x03\x02\x02\x02ij\x03\x02\x02\x02" +
		"j\x0F\x03\x02\x02\x02km\t\x05\x02\x02ln\x05(\x15\x02ml\x03\x02\x02\x02" +
		"mn\x03\x02\x02\x02np\x03\x02\x02\x02oq\x05*\x16\x02po\x03\x02\x02\x02" +
		"pq\x03\x02\x02\x02qs\x03\x02\x02\x02rt\t\x06\x02\x02sr\x03\x02\x02\x02" +
		"st\x03\x02\x02\x02t\x11\x03\x02\x02\x02uw\t\x07\x02\x02vx\x07\x16\x02" +
		"\x02wv\x03\x02\x02\x02wx\x03\x02\x02\x02xy\x03\x02\x02\x02y{\x071\x02" +
		"\x02z|\x07\x0E\x02\x02{z\x03\x02\x02\x02{|\x03\x02\x02\x02|~\x03\x02\x02" +
		"\x02}\x7F\x05,\x17\x02~}\x03\x02\x02\x02~\x7F\x03\x02\x02\x02\x7F\x86" +
		"\x03\x02\x02\x02\x80\x81\x07\f\x02\x02\x81\x83\x07\x11\x02\x02\x82\x84" +
		"\x05,\x17\x02\x83\x82\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x86" +
		"\x03\x02\x02\x02\x85u\x03\x02\x02\x02\x85\x80\x03\x02\x02\x02\x86\x13" +
		"\x03\x02\x02\x02\x87\x88\x07\f\x02\x02\x88\x89\x071\x02\x02\x89\x8B\x07" +
		"\x11\x02\x02\x8A\x8C\x05,\x17\x02\x8B\x8A\x03\x02\x02\x02\x8B\x8C\x03" +
		"\x02\x02\x02\x8C\x15\x03\x02\x02\x02\x8D\x8F\x07\x06\x02\x02\x8E\x90\x07" +
		"\x17\x02\x02\x8F\x8E\x03\x02\x02\x02\x8F\x90\x03\x02\x02\x02\x90\x92\x03" +
		"\x02\x02\x02\x91\x93\x05(\x15\x02\x92\x91\x03\x02\x02\x02\x92\x93\x03" +
		"\x02\x02\x02\x93\x94\x03\x02\x02\x02\x94\x9E\x05*\x16\x02\x95\x97\x07" +
		"\x07\x02\x02\x96\x98\x07\x17\x02\x02\x97\x96\x03\x02\x02\x02\x97\x98\x03" +
		"\x02\x02\x02\x98\x9A\x03\x02\x02\x02\x99\x9B\x05(\x15\x02\x9A\x99\x03" +
		"\x02\x02\x02\x9A\x9B\x03\x02\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9E\x05" +
		"*\x16\x02\x9D\x8D\x03\x02\x02\x02\x9D\x95\x03\x02\x02\x02\x9E\x17\x03" +
		"\x02\x02\x02\x9F\xA1\t\b\x02\x02\xA0\xA2\t\t\x02\x02\xA1\xA0\x03\x02\x02" +
		"\x02\xA1\xA2\x03\x02\x02\x02\xA2\xA4\x03\x02\x02\x02\xA3\xA5\t\n\x02\x02" +
		"\xA4\xA3\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\xA7\x03\x02\x02\x02" +
		"\xA6\xA8\x07\b\x02\x02\xA7\xA6\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02" +
		"\xA8\xAA\x03\x02\x02\x02\xA9\xAB\x07\x1A\x02\x02\xAA\xA9\x03\x02\x02\x02" +
		"\xAA\xAB\x03\x02\x02\x02\xAB\xAD\x03\x02\x02\x02\xAC\xAE\x05,\x17\x02" +
		"\xAD\xAC\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\x19\x03\x02\x02\x02" +
		"\xAF\xB1\x07\x12\x02\x02\xB0\xB2\x07\x16\x02\x02\xB1\xB0\x03\x02\x02\x02" +
		"\xB1\xB2\x03\x02\x02\x02\xB2\xB3\x03\x02\x02\x02\xB3\xB4\x07\x1F\x02\x02" +
		"\xB4\xBB\x07 \x02\x02\xB5\xB8\x07\x0F\x02\x02\xB6\xB9\x07 \x02\x02\xB7" +
		"\xB9\x05(\x15\x02\xB8\xB6\x03\x02\x02\x02\xB8\xB7\x03\x02\x02\x02\xB9" +
		"\xBB\x03\x02\x02\x02\xBA\xAF\x03\x02\x02\x02\xBA\xB5\x03\x02\x02\x02\xBB" +
		"\x1B\x03\x02\x02\x02\xBC\xBD\x07\x0F\x02\x02\xBD\xBE\x07!\x02\x02\xBE" +
		"\xC3\x071\x02\x02\xBF\xC0\x07\x10\x02\x02\xC0\xC1\x07!\x02\x02\xC1\xC3" +
		"\x071\x02\x02\xC2\xBC\x03\x02\x02\x02\xC2\xBF\x03\x02\x02\x02\xC3\x1D" +
		"\x03\x02\x02\x02\xC4\xC6\t\v\x02\x02\xC5\xC7\x07\x18\x02\x02\xC6\xC5\x03" +
		"\x02\x02\x02\xC6\xC7\x03\x02\x02\x02\xC7\xC9\x03\x02\x02\x02\xC8\xCA\t" +
		"\f\x02\x02\xC9\xC8\x03\x02\x02\x02\xC9\xCA\x03\x02\x02\x02\xCA\xCB\x03" +
		"\x02\x02\x02\xCB\xCC\x05*\x16\x02\xCC\x1F\x03\x02\x02\x02\xCD\xCF\t\r" +
		"\x02\x02\xCE\xD0\x07\x19\x02\x02\xCF\xCE\x03\x02\x02\x02\xCF\xD0\x03\x02" +
		"\x02\x02\xD0\xD1\x03\x02\x02\x02\xD1\xD3\x05*\x16\x02\xD2\xD4\x07-\x02" +
		"\x02\xD3\xD2\x03\x02\x02\x02\xD3\xD4\x03\x02\x02\x02\xD4\xD5\x03\x02\x02" +
		"\x02\xD5\xD6\x05\"\x12\x02\xD6\xD7\x05$\x13\x02\xD7\xD8\x073\x02\x02\xD8" +
		"!\x03\x02\x02\x02\xD9\xDB\x075\x02\x02\xDA\xD9\x03\x02\x02\x02\xDB\xDC" +
		"\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDC\xDD\x03\x02\x02\x02\xDD#" +
		"\x03\x02\x02\x02\xDE\xDF\x074\x02\x02\xDF%\x03\x02\x02\x02\xE0\xE2\t\x0E" +
		"\x02\x02\xE1\xE0\x03\x02\x02\x02\xE1\xE2\x03\x02\x02\x02\xE2\xE4\x03\x02" +
		"\x02\x02\xE3\xE5\x07+\x02\x02\xE4\xE3\x03\x02\x02\x02\xE4\xE5\x03\x02" +
		"\x02\x02\xE5\xE6\x03\x02\x02\x02\xE6\xE9\t\x0F\x02\x02\xE7\xE9\x07,\x02" +
		"\x02\xE8\xE1\x03\x02\x02\x02\xE8\xE7\x03\x02\x02\x02\xE9\'\x03\x02\x02" +
		"\x02\xEA\xEB\x070\x02\x02\xEB)\x03\x02\x02\x02\xEC\xED\x07/\x02\x02\xED" +
		"+\x03\x02\x02\x02\xEE\xEF\x072\x02\x02\xEF-\x03\x02\x02\x02+:>EMUY]bd" +
		"impsw{~\x83\x85\x8B\x8F\x92\x97\x9A\x9D\xA1\xA4\xA7\xAA\xAD\xB1\xB8\xBA" +
		"\xC2\xC6\xC9\xCF\xD3\xDC\xE1\xE4\xE8";
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
export class CmdHelpContext extends CommandContext {
	public helpCommand(): HelpCommandContext {
		return this.getRuleContext(0, HelpCommandContext);
	}
	constructor(ctx: CommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterCmdHelp) {
			listener.enterCmdHelp(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitCmdHelp) {
			listener.exitCmdHelp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitCmdHelp) {
			return visitor.visitCmdHelp(this);
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


export class HelpCommandContext extends ParserRuleContext {
	public COMMANDS(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.COMMANDS, 0); }
	public HELP(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.HELP, 0); }
	public AVAILABLE(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.AVAILABLE, 0); }
	public SHOW(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.SHOW, 0); }
	public LIST(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.LIST, 0); }
	public WHAT_CAN_I_DO(): TerminalNode | undefined { return this.tryGetToken(ChatbotCommandsParser.WHAT_CAN_I_DO, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ChatbotCommandsParser.RULE_helpCommand; }
	// @Override
	public enterRule(listener: ChatbotCommandsListener): void {
		if (listener.enterHelpCommand) {
			listener.enterHelpCommand(this);
		}
	}
	// @Override
	public exitRule(listener: ChatbotCommandsListener): void {
		if (listener.exitHelpCommand) {
			listener.exitHelpCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ChatbotCommandsVisitor<Result>): Result {
		if (visitor.visitHelpCommand) {
			return visitor.visitHelpCommand(this);
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


