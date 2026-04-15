// Example: Save content to DB2
async function saveContentToDB(contentData) {
  const dbService = new DB2Service();

  const sql = `
    INSERT INTO content_repurposer.content_items
    (title, original_content, content_type, created_at, status)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP, 'pending')
  `;

  try {
    const result = await dbService.executeNonQuery(sql, [
      contentData.title,
      contentData.content,
      contentData.type
    ]);
    return { success: true, id: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Example: Get repurposed content from DB2
async function getRepurposedContent(contentId) {
  const dbService = new DB2Service();

  const sql = `
    SELECT * FROM content_repurposer.content_items
    WHERE id = ? AND status = 'completed'
  `;

  try {
    const result = await dbService.executeQuery(sql, [contentId]);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Example: Update content status
async function updateContentStatus(contentId, status) {
  const dbService = new DB2Service();

  const sql = `
    UPDATE content_repurposer.content_items
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  try {
    await dbService.executeNonQuery(sql, [status, contentId]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export { saveContentToDB, getRepurposedContent, updateContentStatus };