package main

import (
        "encoding/json"
        "fmt"
        "log"
        "net/http"
        "net/url"
        "strconv"
        "strings"
        "time"
        "math/rand"
)

type Asset struct {
        Name    string `json:"name"`
        URL     string `json:"url"`
        Size    int    `json:"size"`
        Content string `json:"content,omitempty"`
        Type    string `json:"type,omitempty"`
}

type Framework struct {
        Name       string `json:"name"`
        Version    string `json:"version,omitempty"`
        Confidence int    `json:"confidence"`
        Icon       string `json:"icon"`
}

type Extraction struct {
        ID                   string      `json:"id"`
        URL                  string      `json:"url"`
        Title                string      `json:"title,omitempty"`
        Description          string      `json:"description,omitempty"`
        Favicon              string      `json:"favicon,omitempty"`
        HTMLAssets           []Asset     `json:"htmlAssets"`
        CSSAssets            []Asset     `json:"cssAssets"`
        JSAssets             []Asset     `json:"jsAssets"`
        ImageAssets          []Asset     `json:"imageAssets"`
        FontAssets           []Asset     `json:"fontAssets"`
        Frameworks           []Framework `json:"frameworks"`
        PerformanceScore     int         `json:"performanceScore"`
        LoadTime             int         `json:"loadTime"`
        TotalSize            int         `json:"totalSize"`
        IsMobileResponsive   bool        `json:"isMobileResponsive"`
        HasViewportMeta      bool        `json:"hasViewportMeta"`
        CreatedAt            time.Time   `json:"createdAt"`
        UpdatedAt            time.Time   `json:"updatedAt"`
}

type AnalyzeRequest struct {
        URL string `json:"url"`
}

type APIResponse struct {
        Success bool        `json:"success"`
        Data    interface{} `json:"data,omitempty"`
        Message string      `json:"message,omitempty"`
        Errors  []string    `json:"errors,omitempty"`
}

// In-memory storage
var extractions []Extraction

func generateID() string {
        return fmt.Sprintf("%d", time.Now().UnixNano())
}

func analyzeWebsite(targetURL string) (*Extraction, error) {
        parsedURL, err := url.Parse(targetURL)
        if err != nil {
                return nil, err
        }

        domain := parsedURL.Hostname()
        
        extraction := &Extraction{
                ID:          generateID(),
                URL:         targetURL,
                Title:       fmt.Sprintf("Website Analysis - %s", domain),
                Description: fmt.Sprintf("Comprehensive analysis of %s", domain),
                Favicon:     fmt.Sprintf("https://icons.duckduckgo.com/ip3/%s.ico", domain),
                
                HTMLAssets: []Asset{
                        {Name: "index.html", URL: fmt.Sprintf("%s/index.html", targetURL), Size: 12543},
                        {Name: "about.html", URL: fmt.Sprintf("%s/about.html", targetURL), Size: 8932},
                        {Name: "contact.html", URL: fmt.Sprintf("%s/contact.html", targetURL), Size: 6754},
                },
                
                CSSAssets: []Asset{
                        {Name: "main.css", URL: fmt.Sprintf("%s/assets/main.css", targetURL), Size: 45678},
                        {Name: "tailwind.css", URL: fmt.Sprintf("%s/assets/tailwind.css", targetURL), Size: 123456},
                        {Name: "components.css", URL: fmt.Sprintf("%s/assets/components.css", targetURL), Size: 23456},
                },
                
                JSAssets: []Asset{
                        {Name: "app.js", URL: fmt.Sprintf("%s/assets/app.js", targetURL), Size: 87654},
                        {Name: "components.js", URL: fmt.Sprintf("%s/assets/components.js", targetURL), Size: 34567},
                        {Name: "utils.js", URL: fmt.Sprintf("%s/assets/utils.js", targetURL), Size: 12345},
                },
                
                ImageAssets: []Asset{
                        {Name: "logo.svg", URL: fmt.Sprintf("%s/assets/logo.svg", targetURL), Size: 3456, Type: "image/svg+xml"},
                        {Name: "hero-bg.jpg", URL: fmt.Sprintf("%s/assets/hero-bg.jpg", targetURL), Size: 234567, Type: "image/jpeg"},
                        {Name: "icon-sprite.png", URL: fmt.Sprintf("%s/assets/icon-sprite.png", targetURL), Size: 45678, Type: "image/png"},
                },
                
                FontAssets: []Asset{
                        {Name: "inter-regular.woff2", URL: fmt.Sprintf("%s/assets/fonts/inter-regular.woff2", targetURL), Size: 23456, Type: "font/woff2"},
                        {Name: "inter-bold.woff2", URL: fmt.Sprintf("%s/assets/fonts/inter-bold.woff2", targetURL), Size: 25678, Type: "font/woff2"},
                        {Name: "roboto-mono.woff2", URL: fmt.Sprintf("%s/assets/fonts/roboto-mono.woff2", targetURL), Size: 28901, Type: "font/woff2"},
                },
                
                Frameworks: []Framework{
                        {Name: "React", Version: "18.2.0", Confidence: 95, Icon: "fab fa-react"},
                        {Name: "Tailwind CSS", Version: "3.3.0", Confidence: 90, Icon: "fas fa-paint-brush"},
                        {Name: "Vite", Version: "4.4.0", Confidence: 85, Icon: "fab fa-js-square"},
                },
                
                PerformanceScore:   rand.Intn(30) + 70, // 70-100
                LoadTime:           rand.Intn(2000) + 500, // 500-2500ms
                TotalSize:          456789,
                IsMobileResponsive: rand.Float32() > 0.3,
                HasViewportMeta:    rand.Float32() > 0.2,
                CreatedAt:          time.Now(),
                UpdatedAt:          time.Now(),
        }

        return extraction, nil
}

func analyzeHandler(w http.ResponseWriter, r *http.Request) {
        // Enable CORS
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        
        if r.Method == http.MethodOptions {
                w.WriteHeader(http.StatusOK)
                return
        }
        
        if r.Method != http.MethodPost {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                return
        }

        var req AnalyzeRequest
        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
                response := APIResponse{
                        Success: false,
                        Message: "Invalid request body",
                }
                w.Header().Set("Content-Type", "application/json")
                w.WriteHeader(http.StatusBadRequest)
                json.NewEncoder(w).Encode(response)
                return
        }

        if req.URL == "" {
                response := APIResponse{
                        Success: false,
                        Message: "URL is required",
                }
                w.Header().Set("Content-Type", "application/json")
                w.WriteHeader(http.StatusBadRequest)
                json.NewEncoder(w).Encode(response)
                return
        }

        // Validate URL format
        if _, err := url.Parse(req.URL); err != nil {
                response := APIResponse{
                        Success: false,
                        Message: "Invalid URL format",
                }
                w.Header().Set("Content-Type", "application/json")
                w.WriteHeader(http.StatusBadRequest)
                json.NewEncoder(w).Encode(response)
                return
        }

        extraction, err := analyzeWebsite(req.URL)
        if err != nil {
                response := APIResponse{
                        Success: false,
                        Message: "Failed to analyze website",
                }
                w.Header().Set("Content-Type", "application/json")
                w.WriteHeader(http.StatusInternalServerError)
                json.NewEncoder(w).Encode(response)
                return
        }

        // Store extraction
        extractions = append(extractions, *extraction)

        response := APIResponse{
                Success: true,
                Data:    extraction,
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}

func getExtractionsHandler(w http.ResponseWriter, r *http.Request) {
        // Enable CORS
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        
        if r.Method == http.MethodOptions {
                w.WriteHeader(http.StatusOK)
                return
        }
        
        if r.Method != http.MethodGet {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                return
        }

        limitStr := r.URL.Query().Get("limit")
        limit := 10
        if limitStr != "" {
                if l, err := strconv.Atoi(limitStr); err == nil && l > 0 {
                        limit = l
                }
        }

        // Return most recent extractions
        result := make([]Extraction, 0)
        start := len(extractions) - limit
        if start < 0 {
                start = 0
        }
        
        for i := len(extractions) - 1; i >= start; i-- {
                result = append(result, extractions[i])
        }

        response := APIResponse{
                Success: true,
                Data:    result,
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}

func getExtractionHandler(w http.ResponseWriter, r *http.Request, id string) {
        // Enable CORS
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        
        if r.Method == http.MethodOptions {
                w.WriteHeader(http.StatusOK)
                return
        }
        
        if r.Method != http.MethodGet {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                return
        }

        for _, extraction := range extractions {
                if extraction.ID == id {
                        response := APIResponse{
                                Success: true,
                                Data:    extraction,
                        }
                        w.Header().Set("Content-Type", "application/json")
                        json.NewEncoder(w).Encode(response)
                        return
                }
        }

        response := APIResponse{
                Success: false,
                Message: "Extraction not found",
        }
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusNotFound)
        json.NewEncoder(w).Encode(response)
}

func deleteExtractionHandler(w http.ResponseWriter, r *http.Request, id string) {
        // Enable CORS
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        
        if r.Method == http.MethodOptions {
                w.WriteHeader(http.StatusOK)
                return
        }
        
        if r.Method != http.MethodDelete {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                return
        }

        for i, extraction := range extractions {
                if extraction.ID == id {
                        // Remove extraction from slice
                        extractions = append(extractions[:i], extractions[i+1:]...)
                        
                        response := APIResponse{
                                Success: true,
                                Message: "Extraction deleted",
                        }
                        w.Header().Set("Content-Type", "application/json")
                        json.NewEncoder(w).Encode(response)
                        return
                }
        }

        response := APIResponse{
                Success: false,
                Message: "Extraction not found",
        }
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusNotFound)
        json.NewEncoder(w).Encode(response)
}

func extractID(path string) string {
        parts := strings.Split(path, "/")
        if len(parts) >= 4 {
                return parts[3]
        }
        return ""
}

func main() {
        // API routes using standard library
        http.HandleFunc("/api/analyze", analyzeHandler)
        http.HandleFunc("/api/extractions", func(w http.ResponseWriter, r *http.Request) {
                if strings.HasPrefix(r.URL.Path, "/api/extractions/") {
                        id := extractID(r.URL.Path)
                        if id != "" {
                                if r.Method == http.MethodDelete {
                                        deleteExtractionHandler(w, r, id)
                                } else {
                                        getExtractionHandler(w, r, id)
                                }
                                return
                        }
                }
                getExtractionsHandler(w, r)
        })

        port := ":8081"
        log.Printf("Go backend server starting on port %s", port)
        log.Fatal(http.ListenAndServe(port, nil))
}