import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>AI Document Summarizer</h1>
  <p class="subtitle">Extract core insights from your documents instantly.</p>
  
  <div class="glass-panel">
    <div id="upload-section">
      <div id="dropzone" class="dropzone">
        <div class="icon">📄</div>
        <h3>Drag & Drop your file here</h3>
        <p>Supports .txt</p>
        <input type="file" id="fileInput" accept=".txt" />
      </div>
      
      <div id="file-info-container" class="file-info hidden">
        <span id="file-name">filename.txt</span>
        <button id="remove-btn" class="remove-file" aria-label="Remove file">×</button>
      </div>

      <button id="summarize-btn" class="primary-btn" disabled>Generate Summary</button>
      <div id="error-msg" class="error-message hidden"></div>
    </div>

    <div id="loading-section" class="loading-container">
      <div class="spinner"></div>
      <p>Analyzing document and generating summary...</p>
    </div>

    <div id="result-section" class="result-area hidden">
      <h3>✨ Summary</h3>
      <div id="summary-content" class="summary-content">
        <!-- Summary text will appear here -->
      </div>
      <button id="reset-btn" class="primary-btn" style="margin-top: 1.5rem; background-color: #475569;">Summarize Another Document</button>
    </div>
  </div>
`;

// Logic implementation
const dropzone = document.getElementById('dropzone')!;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const fileInfoContainer = document.getElementById('file-info-container')!;
const fileNameDisplay = document.getElementById('file-name')!;
const removeBtn = document.getElementById('remove-btn')!;
const summarizeBtn = document.getElementById('summarize-btn') as HTMLButtonElement;
const errorMsg = document.getElementById('error-msg')!;
const uploadSection = document.getElementById('upload-section')!;
const loadingSection = document.getElementById('loading-section')!;
const resultSection = document.getElementById('result-section')!;
const summaryContent = document.getElementById('summary-content')!;
const resetBtn = document.getElementById('reset-btn')!;

let selectedFile: File | null = null;


['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropzone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
  dropzone.addEventListener(eventName, () => dropzone.classList.add('dragover'), false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropzone.addEventListener(eventName, () => dropzone.classList.remove('dragover'), false);
});

dropzone.addEventListener('drop', handleDrop, false);

function handleDrop(e: DragEvent) {
  const dt = e.dataTransfer;
  if (!dt) return;
  const files = dt.files;
  handleFiles(files);
}

dropzone.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', function() {
  if (this.files) {
    handleFiles(this.files);
  }
});

function handleFiles(files: FileList) {
  if (files.length > 0) {
    const file = files[0];
    if (file.name.endsWith('.txt')) {
      selectedFile = file;
      showFileInfo(file.name);
      errorMsg.classList.add('hidden');
    } else {
      showError("Please upload a .txt file.");
    }
  }
}

function showFileInfo(name: string) {
  fileNameDisplay.textContent = name;
  dropzone.classList.add('hidden');
  fileInfoContainer.classList.remove('hidden');
  summarizeBtn.disabled = false;
}

removeBtn.addEventListener('click', () => {
  resetFileSelection();
});

function resetFileSelection() {
  selectedFile = null;
  fileInput.value = '';
  dropzone.classList.remove('hidden');
  fileInfoContainer.classList.add('hidden');
  summarizeBtn.disabled = true;
  errorMsg.classList.add('hidden');
}

function showError(msg: string) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
  resetFileSelection();
}

// Handle API call
summarizeBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  // Transition to loading state
  uploadSection.classList.add('hidden');
  loadingSection.style.display = 'flex';
  errorMsg.classList.add('hidden');

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await fetch('http://localhost:8000/summarize', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
        let errStr = response.statusText;
        try {
            const errData = await response.json();
            if (errData && errData.detail) errStr = JSON.stringify(errData.detail);
        } catch(e) {}
        throw new Error(`Server responded with ${response.status}: ${errStr}`);
    }

    const data = await response.json();
    
    // Transition to success state
    loadingSection.style.display = 'none';
    resultSection.style.display = 'block';
    
    // The backend returns {'summary': 'text...'}
    summaryContent.textContent = data.summary || "No summary found. The document might be empty or too short.";

  } catch (err: any) {
    console.error(err);
    // Return to upload state on error
    loadingSection.style.display = 'none';
    uploadSection.classList.remove('hidden');
    showError(err.message || 'An error occurred while connecting to the backend. Please check if the FastAPI server is running.');
  }
});

// Reset application
resetBtn.addEventListener('click', () => {
  resultSection.style.display = 'none';
  summaryContent.textContent = '';
  resetFileSelection();
  uploadSection.classList.remove('hidden');
});
