# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161110030842) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree
  end

  create_table "events", force: :cascade do |t|
    t.string   "name",               limit: 128
    t.string   "slug",               limit: 128
    t.integer  "team_id"
    t.text     "schedule_options"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.datetime "starts_at"
    t.datetime "stops_repeating_at"
    t.index ["starts_at", "team_id", "stops_repeating_at"], name: "index_events_on_starts_at_and_team_id_and_stops_repeating_at", using: :btree
    t.index ["team_id", "slug"], name: "index_events_on_team_id_and_slug", unique: true, using: :btree
    t.index ["team_id"], name: "index_events_on_team_id", using: :btree
  end

  create_table "invitations", force: :cascade do |t|
    t.integer  "sponsor_id"
    t.integer  "member_id"
    t.string   "email",                                     null: false
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "token",      limit: 64
    t.string   "state",      limit: 32, default: "pending"
    t.index ["member_id"], name: "index_invitations_on_member_id", using: :btree
    t.index ["sponsor_id"], name: "index_invitations_on_sponsor_id", using: :btree
  end

  create_table "members", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "team_id"
    t.boolean  "admin",                  default: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "name",       limit: 128
    t.index ["team_id", "user_id"], name: "index_members_on_team_id_and_user_id", using: :btree
    t.index ["team_id"], name: "index_members_on_team_id", using: :btree
    t.index ["user_id"], name: "index_members_on_user_id", using: :btree
  end

  create_table "teams", force: :cascade do |t|
    t.string   "name",       limit: 128
    t.string   "slug",       limit: 128
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["slug"], name: "index_teams_on_slug", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "email",                          null: false
    t.string   "encrypted_password", limit: 128, null: false
    t.string   "confirmation_token", limit: 128
    t.string   "remember_token",     limit: 128, null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["remember_token"], name: "index_users_on_remember_token", unique: true, using: :btree
  end

  add_foreign_key "events", "teams", on_delete: :cascade
  add_foreign_key "invitations", "members", column: "sponsor_id", on_delete: :cascade
  add_foreign_key "invitations", "members", on_delete: :cascade
  add_foreign_key "members", "teams"
  add_foreign_key "members", "users"
end
