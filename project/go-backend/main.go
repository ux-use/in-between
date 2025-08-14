package main

import (
        "encoding/json"
        "fmt"
        "log"
        "net/http"
        "os"
        "strings"
        "time"

        "github.com/gorilla/mux"
        "github.com/rs/cors"
)

type CodeRequest struct {
        HTML string `json:"html"`
        CSS  string `json:"css"`
        JS   string `json:"js"`
}

type CodeResponse struct {
        ID  string `json:"id"`
        URL string `json:"url"`
}

func main() {
        r := mux.NewRouter()

        // Enable CORS
        c := cors.New(cors.Options{
                AllowedOrigins: []string{"*"},
                AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
                AllowedHeaders: []string{"*"},
        })

        // Create preview directory
        if err := os.MkdirAll("previews", 0755); err != nil {
                log.Fatal("Failed to create previews directory:", err)
        }

        // API routes
        r.HandleFunc("/api/code/preview", handleCodePreview).Methods("POST")
        r.HandleFunc("/api/code/{id}", handleGetCode).Methods("GET")

        // Static file serving for previews
        r.PathPrefix("/previews/").Handler(http.StripPrefix("/previews/", http.FileServer(http.Dir("./previews/"))))

        handler := c.Handler(r)

        port := os.Getenv("PORT")
        if port == "" {
                port = "8081"
        }

        fmt.Printf("Go backend server running on port %s\n", port)
        log.Fatal(http.ListenAndServe(":"+port, handler))
}

func handleCodePreview(w http.ResponseWriter, r *http.Request) {
        var req CodeRequest
        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
                http.Error(w, "Invalid JSON", http.StatusBadRequest)
                return
        }

        // Generate unique ID
        id := generateID()

        // Create HTML file with embedded CSS and JS
        html := generatePreviewHTML(req.HTML, req.CSS, req.JS)

        // Write to file
        filename := fmt.Sprintf("previews/%s.html", id)
        if err := os.WriteFile(filename, []byte(html), 0644); err != nil {
                http.Error(w, "Failed to create preview", http.StatusInternalServerError)
                return
        }

        response := CodeResponse{
                ID:  id,
                URL: fmt.Sprintf("/previews/%s.html", id),
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}

func handleGetCode(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        id := vars["id"]

        filename := fmt.Sprintf("previews/%s.html", id)
        content, err := os.ReadFile(filename)
        if err != nil {
                http.Error(w, "Preview not found", http.StatusNotFound)
                return
        }

        w.Header().Set("Content-Type", "text/html")
        w.Write(content)
}

func generatePreviewHTML(htmlContent, css, js string) string {
        // Extract body content from HTML if it contains full HTML structure
        bodyContent := extractBodyContent(htmlContent)

        return fmt.Sprintf(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Preview</title>
    <style>%s</style>
</head>
<body>
%s
<script>%s</script>
</body>
</html>`, css, bodyContent, js)
}

func extractBodyContent(html string) string {
        // Simple extraction - remove doctype, html, head, and body tags
        content := html
        content = strings.ReplaceAll(content, "<!DOCTYPE html>", "")
        content = strings.ReplaceAll(content, "<!doctype html>", "")
        
        // Remove html tags
        if strings.Contains(strings.ToLower(content), "<html") {
                start := strings.Index(strings.ToLower(content), "<body")
                if start != -1 {
                        start = strings.Index(content[start:], ">") + start + 1
                        end := strings.LastIndex(strings.ToLower(content), "</body>")
                        if end != -1 && end > start {
                                return content[start:end]
                        }
                }
        }
        
        return content
}

func generateID() string {
        // Simple ID generation using timestamp
        return fmt.Sprintf("code_%d", time.Now().UnixNano())
}