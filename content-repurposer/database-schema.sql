-- Content Repurposer Database Schema for DB2

-- Create schema
CREATE SCHEMA content_repurposer;

-- Main content items table
CREATE TABLE content_repurposer.content_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    original_content CLOB,
    content_type VARCHAR(50) NOT NULL, -- 'video', 'article', 'social_post', etc.
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata CLOB -- JSON metadata for additional info
);

-- Repurposed content variations
CREATE TABLE content_repurposer.content_variations (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content_id INTEGER NOT NULL,
    variation_type VARCHAR(50) NOT NULL, -- 'twitter_thread', 'blog_post', 'linkedin_post', etc.
    repurposed_content CLOB NOT NULL,
    platform VARCHAR(50), -- 'twitter', 'linkedin', 'blog', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (content_id) REFERENCES content_repurposer.content_items(id) ON DELETE CASCADE
);

-- Content analytics/performance tracking
CREATE TABLE content_repurposer.content_analytics (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    variation_id INTEGER NOT NULL,
    platform VARCHAR(50) NOT NULL,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (variation_id) REFERENCES content_repurposer.content_variations(id) ON DELETE CASCADE
);

-- User sessions/content history
CREATE TABLE content_repurposer.user_sessions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id VARCHAR(100), -- For future user management
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_content_items_status ON content_repurposer.content_items(status);
CREATE INDEX idx_content_items_created ON content_repurposer.content_items(created_at DESC);
CREATE INDEX idx_content_variations_content ON content_repurposer.content_variations(content_id);
