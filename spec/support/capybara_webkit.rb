# frozen_string_literal: true
# Capybara.javascript_driver = :webkit

# Capybara::Webkit.configure do |config|
#   config.block_unknown_urls
# end

require 'capybara/poltergeist'

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, timeout: 1.minute)
end

Capybara.javascript_driver = :poltergeist
