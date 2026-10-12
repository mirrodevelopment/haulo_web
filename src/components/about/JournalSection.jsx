import React from 'react';
import { journalPosts } from '../../data/aboutProjects';

export function JournalSection() {
  return (
    <section className="journal-section">
      <div className="journal-container">
        <div className="journal-header">
          <div>
            <span className="mono-tag">[ 17 / PERSPECTIVES ]</span>
            <h2 className="section-title">FROM THE JOURNAL</h2>
          </div>
          <p className="journal-sub-copy">
            Thinking on technology, design, AI, engineering, and product.
          </p>
        </div>

        <div className="journal-rows-list">
          {journalPosts.map((post) => (
            <div key={post.num} className="journal-row">
              <div className="journal-date-col">
                <span className="journal-num">{post.num}</span>
                <span className="journal-date">{post.date}</span>
              </div>
              <div className="journal-content-col">
                <span className="journal-category">{post.category}</span>
                <h3 className="journal-post-title">{post.title}</h3>
              </div>
              <div className="journal-arrow-col">
                <span className="journal-arrow">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
