import re

# Read the file
with open('expertise-securite.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the old pattern
old_pattern = r'<div class="project-grid">.*?</div>\s*</section>'

# Define the replacement
replacement = '''<div class="projects-carousel-container">
                <div class="projects-carousel">
                    <div class="carousel-project-slide active">
                        <div class="carousel-project-media">
                            <img src="assets/images/camera-ip.jpg" alt="Vidéosurveillance" class="carousel-project-img" loading="lazy">
                        </div>
                        <div class="carousel-project-info">
                            <span class="carousel-project-date">2023</span>
                            <h4>Installation vidéosurveillance Hikvision</h4>
                            <p>20 caméras, NVR, accès mobile et stockage centralisé.</p>
                        </div>
                    </div>
                    <div class="carousel-project-slide">
                        <div class="carousel-project-media">
                            <img src="assets/images/controle-acces.jpg" alt="Contrôle d'accès" class="carousel-project-img" loading="lazy">
                        </div>
                        <div class="carousel-project-info">
                            <span class="carousel-project-date">2024</span>
                            <h4>Contrôle d'accès badge + biométrie</h4>
                            <p>Implantation dans un immeuble de bureaux.</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-project-prev" aria-label="Projet précédent"><i class="fas fa-chevron-left"></i></button>
                <button class="carousel-project-next" aria-label="Projet suivant"><i class="fas fa-chevron-right"></i></button>
                <div class="carousel-project-indicators">
                    <span class="carousel-project-indicator active"></span>
                    <span class="carousel-project-indicator"></span>
                </div>
            </div>
        </section>'''

# Replace using regex with DOTALL flag
new_content = re.sub(old_pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('expertise-securite.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("expertise-securite.html updated successfully!")
