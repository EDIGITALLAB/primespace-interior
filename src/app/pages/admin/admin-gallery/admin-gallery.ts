import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService, AdminProject, AdminBlock, BlockPhoto } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-gallery.html',
  styleUrl: './admin-gallery.css'
})
export class AdminGallery {
  adminData = inject(AdminDataService);
  private route = inject(ActivatedRoute);

  // Selected Apartment Project & Block
  selectedProjectId = signal<string>('');
  selectedBlockId = signal<string>('');

  // Category filter tag
  activeRoomTag = signal<string>('All');

  // Add Photo Modal
  showAddPhotoModal = signal(false);
  photoUrl = signal('/hero_living_room.png');
  photoCaption = signal('');
  photoCategory = signal<'Living Room' | 'Kitchen' | 'Bedroom' | 'Bathroom' | 'Balcony' | 'Foyer'>('Living Room');

  // Add Block Modal
  showAddBlockModal = signal(false);
  newBlockName = signal('');
  newBlockHomes = signal(4);

  constructor() {
    this.route.queryParams.subscribe(params => {
      const projId = params['projectId'];
      const projList = this.adminData.projects();
      
      if (projId && projList.some(p => p.id === projId)) {
        this.onProjectChange(projId);
      } else if (projList.length > 0 && !this.selectedProjectId()) {
        this.selectedProjectId.set(projList[0].id);
        if (projList[0].blocks.length > 0) {
          this.selectedBlockId.set(projList[0].blocks[0].id);
        }
      }
    });
  }

  get projectsList(): AdminProject[] {
    return this.adminData.projects();
  }

  get selectedProject(): AdminProject | undefined {
    return this.adminData.projects().find(p => p.id === this.selectedProjectId());
  }

  get selectedBlock(): AdminBlock | undefined {
    const proj = this.selectedProject;
    if (!proj) return undefined;
    return proj.blocks.find(b => b.id === this.selectedBlockId());
  }

  get filteredPhotos(): BlockPhoto[] {
    const block = this.selectedBlock;
    if (!block) return [];
    const photos = block.photos || [];
    const tag = this.activeRoomTag();
    if (tag === 'All') return photos;
    return photos.filter(p => p.category.toLowerCase() === tag.toLowerCase());
  }

  onProjectChange(projectId: string) {
    this.selectedProjectId.set(projectId);
    const proj = this.adminData.projects().find(p => p.id === projectId);
    if (proj && proj.blocks.length > 0) {
      this.selectedBlockId.set(proj.blocks[0].id);
    } else {
      this.selectedBlockId.set('');
    }
  }

  openAddPhotoModal() {
    this.photoUrl.set('/luxury_living_room_1.png');
    this.photoCaption.set('');
    this.photoCategory.set('Living Room');
    this.showAddPhotoModal.set(true);
  }

  closeAddPhotoModal() {
    this.showAddPhotoModal.set(false);
  }

  savePhoto(e: Event) {
    e.preventDefault();
    const pId = this.selectedProjectId();
    const bId = this.selectedBlockId();
    if (!pId || !bId) return;

    this.adminData.addPhotoToBlock(pId, bId, {
      url: this.photoUrl(),
      caption: this.photoCaption() || 'Interior Room Design',
      category: this.photoCategory()
    });

    this.closeAddPhotoModal();
  }

  deletePhoto(photoId: string) {
    const pId = this.selectedProjectId();
    const bId = this.selectedBlockId();
    if (confirm('Delete this photo from block?')) {
      this.adminData.deletePhotoFromBlock(pId, bId, photoId);
    }
  }

  openAddBlockModal() {
    this.newBlockName.set('Block D – Home 04');
    this.newBlockHomes.set(4);
    this.showAddBlockModal.set(true);
  }

  closeAddBlockModal() {
    this.showAddBlockModal.set(false);
  }

  saveBlock(e: Event) {
    e.preventDefault();
    const pId = this.selectedProjectId();
    if (!pId || !this.newBlockName()) return;

    this.adminData.addBlockToProject(pId, this.newBlockName(), Number(this.newBlockHomes()));
    this.closeAddBlockModal();
  }

  deleteBlock(blockId: string) {
    const pId = this.selectedProjectId();
    if (confirm('Delete this block and all its photos?')) {
      this.adminData.deleteBlockFromProject(pId, blockId);
      const proj = this.selectedProject;
      if (proj && proj.blocks.length > 0) {
        this.selectedBlockId.set(proj.blocks[0].id);
      } else {
        this.selectedBlockId.set('');
      }
    }
  }
}
