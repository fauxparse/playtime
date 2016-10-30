# frozen_string_literal: true
source 'https://rubygems.org'

ruby '2.3.1'

gem 'autoprefixer-rails'
gem 'clearance'
gem 'cry'
gem 'delayed_job_active_record'
gem 'flutie'
gem 'auto_strip_attributes'
gem 'honeybadger'
gem 'normalize-rails', '~> 3.0.0'
gem 'pg'
gem 'puma'
gem 'rack-canonical-host'
gem 'rails', '~> 5.0.0'
gem 'recipient_interceptor'
gem 'sass-rails', '~> 5.0'
gem 'simple_form'
gem 'skylight'
gem 'sprockets', '>= 3.0.0'
gem 'sprockets-es6'
gem 'stringex'
gem 'suspenders'
gem 'title'
gem 'uglifier'
gem 'vanilla-ujs'

group :development do
  gem 'guard'
  gem 'guard-rails', require: false
  gem 'guard-rspec', require: false
  gem 'guard-rubocop', require: false
  gem 'listen'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'web-console'
end

group :development, :test do
  gem 'awesome_print'
  gem 'bullet'
  gem 'bundler-audit', '>= 0.5.0', require: false
  gem 'dotenv-rails'
  gem 'factory_girl_rails'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'rspec-rails', '~> 3.5.0.beta4'
  gem 'rubocop', require: false
end

group :development, :staging do
  gem 'rack-mini-profiler', require: false
end

group :test do
  gem 'capybara-webkit'
  gem 'codeclimate-test-reporter', require: nil
  gem 'database_cleaner'
  gem 'email_spec'
  gem 'formulaic'
  gem 'launchy'
  gem 'rspec-collection_matchers'
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
  gem 'timecop'
  gem 'webmock'
end

group :staging, :production do
  gem 'rack-timeout'
  gem 'rails_stdout_logging'
end

gem 'high_voltage'
gem 'bourbon', '5.0.0.beta.6'
gem 'neat', '~> 1.8.0'
gem 'refills', group: [:development, :test]

gem 'react_webpack_rails'
gem 'rwr-view_helpers'
gem 'rwr-redux'
