//export const BASE_URL = 'http://api.thebraghouse.com/';

// export const BASE_URL = 'http://192.168.1.222/braghouse/';// techwave local
export const BASE_URL = 'http://103.93.136.67/braghouse/';

// export const BASE_URL = 'http://178.128.108.85/'; //live1
// export const BASE_URL = 'http://142.93.59.240/'; 

//export const BASE_URL = 'http://192.168.0.193/braghouse/';
// export const BASE_URL = 'http://192.168.5.51/braghouse/'  


export const IMAGE_URL = 'https://braghouse-staging.s3.amazonaws.com/upload/';

export const PRIVACY_POLICY_URL = BASE_URL+'privacy-policy.html';

export const ALL_CONFERENCE_URL = BASE_URL+'fantasy/sl_lobby/get_all_conference';
export const ALL_TEAMS_URL = BASE_URL+'fantasy/sl_lobby/get_all_team';

// export const SIGNUP_PHONE = BASE_URL+'user/auth/signup_phone';

export const CREATE_BRAG_MASTER_URL_SL = BASE_URL+'fantasy/contest/create_league_master_data';
export const SIGNUP_PHONE = BASE_URL+'user/auth/signup_phone';

export const VALIDATE_OTP = BASE_URL+'user/auth/validate_otp';
export const RESEND_OTP = BASE_URL+'user/auth/resend_otp';

export const CREATE_BRAG_MASTER_URL = BASE_URL+'fantasy/contest/create_league_master_data';
export const CREATE_BRAG_GET_PLAYER_URL = BASE_URL+'fantasy/contest/create_league_player_data';
export const CREATE_BRAG_GET_TEAM_MATCHES = BASE_URL+'fantasy/sl_lobby/get_next_week_seasons_by_team';
export const CREATE_BRAG_API = BASE_URL+'fantasy/contest/create_league_by_user';
export const JOIN_BRAG_MASTER_API = BASE_URL+'fantasy/sl_contest/get_contest_detail';
export const JOIN_BRAG_API = BASE_URL+'fantasy/sl_contest/join_game';
export const AUTO_SEARCH_BRAG_API = BASE_URL+'/fantasy/common/get_contest_question_options';
export const LOGIN_API = BASE_URL+'user/auth/login_phone';
export const UPDATE_PROFILE = BASE_URL+'user/my_profile/update_profile';
export const TOGGLE_FOLLOW_ENTITY = BASE_URL+'user/follow/toggle_follow_entity';
export const GET_ACTIVE_BRAGS = BASE_URL+'fantasy/sl_contest/get_active_brags';
export const GET_HOT_BRAGS = BASE_URL+'fantasy/sl_contest/get_hot_brags';
export const GET_TOP_USERS = BASE_URL+'user/follow/get_top_users';
export const FORGOT_PASSWORD = BASE_URL+'user/auth/forgot_password';
export const FORGOT_PASSWORD_VALIDATE_CODE = BASE_URL+'user/auth/forgot_password_validate_code';
export const CHANGE_PASSWORD = BASE_URL+'user/auth/change_password';
export const GET_MY_LEAGUES = BASE_URL+'fantasy/sl_contest/get_my_leagues';
export const UPLOAD_PROFILE_PIC = BASE_URL+'user/my_profile/do_upload';
export const GET_LOBBY_MASTER_DATA = BASE_URL+'fantasy/sl_lobby/get_lobby_master_data';
export const CREATE_POST = BASE_URL+'user/activity/add_activity';
export const UPLOAD_MEDIA = BASE_URL+'user/activity/upload_media'
export const GET_BRAG_LIST_FOR_FEED = BASE_URL+'fantasy/sl_contest/get_brag_list_for_feed';
export const GET_HOME_CONFERENCE_TEAM = BASE_URL+'fantasy/sl_lobby/get_home_conference_team';
export const GET_CONTESTS_OF_LEAGUE = BASE_URL+'fantasy/sl_lobby/get_contests_of_league';
export const GET_BRAG_SPACE_API = BASE_URL+'fantasy/sl_contest/get_brag_space_data';
export const ADD_COMMENT = BASE_URL+'user/activity/add_comment';
export const LIST_COMMENT = BASE_URL+'user/activity/comment_list';
export const USER_ACTIVITY = BASE_URL+'user/activity';
export const ACTIVITY_TOGGLE_LIKE = BASE_URL+'user/activity/activity_toggle_like';
export const GET_TRANSACTION_HISTORY = BASE_URL+'user/finance/get_transaction_history';
export const MY_NOTIFICATION_LIST = BASE_URL+'user/notification/get_notification';
export const GET_USER_FOLLOW_TEAMS = BASE_URL+'fantasy/common/get_user_follow_teams';
export const GET_HOT_BRAGS_QUESTION_API = BASE_URL+'fantasy/sl_lobby/get_hot_brags';
export const GET_USER_BALANCE = BASE_URL+'user/finance/get_user_balance';
export const GET_USER_CREATED_BRAGS = BASE_URL+'fantasy/sl_lobby/get_user_created_brags';
export const GET_USER_PROFILE = BASE_URL+'user/my_profile/get_user_profile';
export const GET_NEWS = BASE_URL+'fantasy/common/get_news';
export const BRAG_TOGGLE_LIKE = BASE_URL+'fantasy/sl_contest/brag_toggle_like';
export const BRAG_ADD_COMMENT = BASE_URL+'fantasy/sl_contest/add_comment';
export const BRAG_COMMENT_LIST = BASE_URL+'user/activity/brag_comment_list';
export const CHECK_ELIGIBILITY_FOR_CONTEST = BASE_URL+'fantasy/contest/check_eligibility_for_contest';
export const SEARCH_PEOPLE_TEAM_API = BASE_URL+'user/common/people_and_team_search';
export const DELETE_ACTIVITY = BASE_URL+'user/activity/delete_activity';
export const DELETE_COMMENT = BASE_URL+'user/activity/delete_comment';
export const GET_ALL_ROSTER = BASE_URL+'fantasy/sl_lineup/get_all_roster';
export const PLAYER_CARD_DETAILS = BASE_URL+'fantasy/playercard/player_card_details';

export const GET_FOLLOWER_LIST = BASE_URL+'user/follow/get_followers_list';
export const GET_FOLLOWING_LIST = BASE_URL+'/user/follow/get_following_list';

export const GET_WEEKLY_LEADERBOARD = BASE_URL+'fantasy/leaderboard/get_weekly_leaderboard';
export const GET_OVERALL_LEADERBOARD = BASE_URL+'fantasy/leaderboard/get_overall_leaderboard';
export const GET_PLAYER_PROJECTION = BASE_URL+'sports/roster/get_player_projection';
export const GET_TOP_BRAGGER = BASE_URL+'fantasy/leaderboard/get_top_bragger';
export const UPDATE_READ_ALL = BASE_URL+'user/notification/update_read_all';
export const GET_TEAM_DETAIL = BASE_URL+'fantasy/sl_lobby/get_team_detail';
export const GET_NEXT_WEEK = BASE_URL+'fantasy/sl_contest/get_next_week';
export const GET_FIXTURE_LIST = BASE_URL+'fantasy/sl_contest/get_fixture_list_by_status';
export const GET_ALL_WEEK = BASE_URL+'fantasy/sl_contest/get_all_week';

export const GET_ORDER_ID = BASE_URL+'user/finance/deposit';
export const UPDATE_ORDER_STATUS = 'user/finance/update_order_status';

export const CHARGE_STRIPE = BASE_URL+'user/stripe/charge';//
export const FINANCE_WITHDRAW = BASE_URL+'user/finance/withdraw';//
export const UPDATE_BANK_ACCOUNT_DETAIL = BASE_URL+'user/my_profile/update_bank_ac_detail';

export const GET_STATE_LIST = BASE_URL+'user/my_profile/get_state_list';//



export const COMMON_SUPPORT = BASE_URL+'user/common/support';//


// export const GET_FOLLOWER_LIST

