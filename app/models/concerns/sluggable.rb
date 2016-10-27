module Sluggable
  extend ActiveSupport::Concern

  DEFAULT_OPTIONS = {
    url_attribute: :slug
  }.freeze

  module ClassMethods
    def sluggable(options = {})
      options = sluggable_options(options)
      acts_as_url :name, sluggable_options(options)

      define_method :to_param do
        send options[:url_attribute]
      end
    end

    def sluggable_options(options)
      options.reverse_merge(DEFAULT_OPTIONS).tap do |options|
        options[:limit] ||= columns_hash[options[:url_attribute].to_s].limit
      end
    end
  end
end
