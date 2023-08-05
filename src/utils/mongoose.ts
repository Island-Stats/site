import exp from "constants";
import mongoose, { InferSchemaType, Mongoose } from "mongoose";

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;

let clientPromise = mongoose.connect(uri);

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

const BattleBox = new mongoose.Schema(
	{
		team_first_place: Number,
		team_second_place: Number,
		team_third_place: Number,
		team_fourth_place: Number,
		team_rounds_won: Number,
		players_killed: Number,
		games_played: Number,
	},
	{ _id: false }
);
export type BattleBox = InferSchemaType<typeof BattleBox>;

const SkyBattle = new mongoose.Schema(
	{
		survival_first_place: Number,
		survival_top_three: Number,
		survival_top_five: Number,
		survival_top_eight: Number,
		survival_top_fifty_percent: Number,
		players_killed: Number,
		games_played: Number,
	},
	{ _id: false }
);
export type SkyBattle = InferSchemaType<typeof SkyBattle>;

const HoleInTheWall = new mongoose.Schema(
	{
		first_place: Number,
		top_three: Number,
		top_five: Number,
		top_eight: Number,
		top_fifty_percent: Number,
		walls_dodged: Number,
		games_played: Number,
	},
	{ _id: false }
);
export type HoleInTheWall = InferSchemaType<typeof HoleInTheWall>;

const TGTToS = new mongoose.Schema(
	{
		first_place: Number,
		top_three: Number,
		top_five: Number,
		top_eight: Number,
		top_fifty_percent: Number,
		round_first_place: Number,
		round_top_three: Number,
		round_top_five: Number,
		round_top_eight: Number,
		round_top_fifty_percent: Number,
		chickens_punched: Number,
		games_played: Number,
	},
	{ _id: false }
);
export type TGTToS = InferSchemaType<typeof TGTToS>;

const uuidCache = new mongoose.Schema(
	{
		_id: mongoose.Types.ObjectId,
		uuid: String,
		username: String,
		last_modified: Date,
	},
	{ versionKey: false }
);

const Player = new mongoose.Schema(
	{
		uuid: String,
		username: String,
		rank: String,

		games: {
			battle_box: {
				type: BattleBox,
			},
			sky_battle: {
				type: SkyBattle,
			},
			hole_in_the_wall: {
				type: HoleInTheWall,
			},
			tgttos: {
				type: TGTToS,
			},
		},

		games_played: Number,
		last_modified: Number,
	},
	{ versionKey: false }
);
export type Player = InferSchemaType<typeof Player>;

// Export Models
export const uuidCacheModel =
	mongoose.models.uuid_cache || mongoose.model("uuid_cache", uuidCache);
export const playerModel =
	mongoose.models.player || mongoose.model("player", Player);
